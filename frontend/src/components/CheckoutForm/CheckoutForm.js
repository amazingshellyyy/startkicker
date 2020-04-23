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
    axios.get(`${process.env.REACT_APP_API_URL}/plan/${planId}`,{headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res => {
        this.setState({
          curPlan: res.data,
          amount: (res.data.price) * 100
        })
      })
      .catch(err => {
        process.env.MODE=='dev'&&console.log(err);
      })
  }

  getcurUser(curUser) {
    axios.get(`${process.env.REACT_APP_API_URL}/user/${curUser}`, {headers: {'Access-Control-Allow-Origin': '*'}})
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
    event.preventDefault();

    const userId = this.props.curUser;
    const objectToSend = {
      amount: this.state.amount,
      currency: "usd",
      metadata: { ...this.state.curPlan, userId }
    }
    axios.post(`${process.env.REACT_APP_API_URL}/pay/createPaymentIntent`, objectToSend, {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res => {

        this.handlePayment(res.data.client_secret)
      })
      .catch(err => {
        console.log(err.response)
      })
  };

  handlePayment = async (client_secret) => {
    const { stripe, elements } = this.props

    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        this.setState({
          display: "",
          display2: "none"
        })
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