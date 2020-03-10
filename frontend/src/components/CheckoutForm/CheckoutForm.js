import React from 'react';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios';
import CardSection from '../CardSection/CardSection';

class CheckoutForm extends React.Component {
  state= {
    client_secret: ''
  }

  handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    
     //a request to api route first to get the client secret
    axios.post(`${process.env.REACT_APP_API_URL}/pay/createPaymentIntent`,{amount: 1000})
      .then(res => {
        console.log(res.data);
        this.handlePayment(res.data.client_secret)
      })
      .catch(err => {
        console.log(err.response)
      })
  };

  handlePayment = async(client_secret) =>{
    const {stripe, elements} = this.props

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        console.log('payment success');
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button disabled={!this.props.stripe}>Confirm order</button>
      </form>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <CheckoutForm  stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}