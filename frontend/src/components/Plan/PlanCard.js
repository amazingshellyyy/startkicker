import React from 'react';
import {  Row, Col, Card, Button } from 'react-bootstrap';
import { withRouter } from "react-router";
import qs from 'query-string';
import axios from 'axios';

class PlanCard extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      plan: this.props.plan,
      border: '' 
    }
  }
 
 
  addBorder=()=> {
    const planId=qs.parse(this.props.location.search).id
    if (planId == this.props.plan._id) {
     return '3px solid red'
    } else {
      return ''
    }
  }
  handleEdit= event => {
    event.preventDefault();
    this.props.updateEditPlan(this.props.plan._id);
    this.props.history.push({
      pathname: `/create/project/${this.props.plan.project}/plan`,
      search: `id=${this.props.plan._id}`
    })
  }

  handleDelete = event => {
    event.preventDefault();
    axios.delete(`${process.env.REACT_APP_API_URL}/plan/${this.state.plan._id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          plan:{}
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  

  render(){
    return (
      <Row className="">
        <Col></Col>
        <Col>
          {this.state.plan.title && 
          <>
          <Card style={{ width: '20rem', minHeight: '20rem', margin:"10px", border:this.addBorder()}}>
          <Card.Body>
          <Card.Title>{this.state.plan.title}</Card.Title>
            <Card.Subtitle className="mt-3 mb-2">{this.state.plan.subtitle}</Card.Subtitle>
            <Card.Text className="text-muted">{this.state.plan.content}</Card.Text>
            <div>
            <small className="text-muted">ESTIMATE DELIVERY</small>
            <Card.Text>{this.state.plan.estDelivery}</Card.Text>
            </div>
            <div>
            <small className="text-muted">{this.state.plan.backers.length} bakers</small>
            </div>{(this.props.curUser === this.state.plan.user)&&<>
            <Button variant="outline-dark" onClick={this.handleEdit}>Edit</Button>
            <Button variant="outline-danger" onClick={this.handleDelete}>Delete</Button></>}
            
          </Card.Body>
          </Card>
          </>}
        </Col>
        <Col></Col>
      
      </Row>
    )
  }
  
}




export default withRouter(PlanCard);