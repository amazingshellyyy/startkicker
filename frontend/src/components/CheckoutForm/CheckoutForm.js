import React from 'react';
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { withRouter } from "react-router";
import CardSection from '../CardSection/CardSection';
import { Container, Row, Col, Button } from 'react-bootstrap';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      client_secret: '',
      curPlan: {},
      amount: 0,
      curUser: {},
      display: "none",
      display2: ""
    }
  }

  componentDidMount() {
    const planId = this.props.match.params.planId
    axios.get(`${process.env.REACT_APP_API_URL}/plan/${planId}`)
      .then(res => {
        this.setState({
          curPlan: res.data,
          amount: (res.data.price) * 100
        })
      })
      .catch(err => {
        process.env.MODE=='dev'&&console.log(err);
        // process.env.MODE=='production'&&
      })
  }

  getcurUser(curUser) {
    axios.get(`${process.env.REACT_APP_API_URL}/user/${curUser}`)
      .then(res => {
        this.setState({
          curUser: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    // this.getcurUser(this.props.curUser)
    console.log(this.props.curUser)
    //email,name
    // const customer = {
    //   email: this.state.curUser.email,
    //   name: this.state.curUser.username
    // }
    // console.log(customer)
    // axios.post(`${process.env.REACT_APP_API_URL}/pay/createCustomer`, customer)

    const userId = this.props.curUser;
    // console.log(userId)
    // console.log(this.state)
    // console.log(this.state.curPlan)
    // amount,currency,customer,metadata
    const objectToSend = {
      amount: this.state.amount,
      currency: "usd",
      metadata: { ...this.state.curPlan, userId }
    }
    console.log("objectToSend", objectToSend);
    //a request to api route first to get the client secret
    axios.post(`${process.env.REACT_APP_API_URL}/pay/createPaymentIntent`, objectToSend)
      .then(res => {
        console.log(res.data);

        this.handlePayment(res.data.client_secret)
      })
      .catch(err => {
        console.log(err.response)
      })
  };

  handlePayment = async (client_secret) => {
    const { stripe, elements } = this.props

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log('payment success');
        this.setState({
          display: "",
          display2: "none"
        })
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  }
  toProfile = event => {
    event.preventDefault();
    this.props.history.push(`/profile/${this.props.curUser}`)
  }

  render() {
    return (
      <>
        {/* <Container style={{ height: "80vh" }}> */}
          <Row className="mt-5" >
            
            <Col>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <CardSection />
              <Container className="p-0">
              <div style={{ display: this.state.display }}>
                <p>Payment success</p>
                <Button variant="outline-primary" onClick={this.toProfile}>See All the project you back</Button>
              </div>
              <Button className="mt-4" variant="outline-primary" disabled={!this.props.stripe} style={{ display: this.state.display2 }} type="submit">Confirm order</Button>
              </Container>
            </form>
              
            </Col>
            
          </Row>
        {/* </Container> */}
      </>
    );
  }
}

const CheckoutFormWithRouter = withRouter(CheckoutForm)

export default function InjectedCheckoutForm(props) {

  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutFormWithRouter {...props} stripe={stripe} elements={elements} />)
      }
    </ElementsConsumer>
  );
}