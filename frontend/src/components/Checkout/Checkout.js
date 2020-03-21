import React from 'react';
import PlanList from '../Plan/PlanList';
import './Checkout.css';
import {Container, Row, Col} from 'react-bootstrap';
import { withRouter } from "react-router";

class Checkout extends React.Component {
  state={
    seletedId:'',
    
  }

  handleSelect=(planId)=> {
    this.setState({
      seletedId: planId,
      
    })
    this.props.history.push({
      pathname:this.props.location.pathname.concat(`/${planId}`),
      
    })

  }
  render(){
    return(
      <>
      <div style={{minHeight: "75vh"}}>
      <Container className="mt-5" >
        <Row>
          <Col>
          <h3>Celebrate bringing this project to life</h3>
          <h6>Select a plan below to be a part of it</h6>
          </Col>
        </Row>
        
      </Container>
      
      <PlanList handleSelect={this.handleSelect.bind(this)} show={this.state.show} selectedId={this.state.seletedId}/>
      </div>
      </>
    )
  }
  
}

export default withRouter(Checkout);