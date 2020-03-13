import React, { Component } from 'react';
import { Container} from 'react-bootstrap';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import './Payment.css';
import { withRouter } from "react-router";
import CheckoutForm from '../CheckoutForm/CheckoutForm';
const stripePromise = loadStripe("pk_test_LS379O30gWnSDhwufbwDW00n000Zu7rz1X");



class Payment extends Component {
 
render(){

  return (
    <>
     <Container>
      <Elements stripe={stripePromise}>
      <CheckoutForm curUser={this.props.curUser}/>
    </Elements>
      </Container>
    </>
  );
}
}

export default withRouter(Payment);
