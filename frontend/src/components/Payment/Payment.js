import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import './Payment.css';
import PlanCard from '../Plan/PlanCard';
import { withRouter } from "react-router";
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import axios from 'axios';
const stripePromise = loadStripe("pk_test_LS379O30gWnSDhwufbwDW00n000Zu7rz1X");



class Payment extends Component {
  state= {
    curPlan: {}
  }
 

  componentDidMount(){
    axios.get(`${process.env.REACT_APP_API_URL}/plan/${this.props.match.params.planId}`,{headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res => {
        this.setState({
          curPlan: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  

  
render(){

  return (
    <>
     <Container style={{minHeight:"86vh"}}>
       <Row className="mt-5">
         
         
         {this.state.curPlan && <><PlanCard plan={this.state.curPlan}/></>}
         
         
       
       </Row>
      <Elements stripe={stripePromise}>
      <CheckoutForm curUser={this.props.curUser}/>
    </Elements>
       
      </Container>
    </>
  );
}
}

export default withRouter(Payment);
