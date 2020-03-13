import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';
import './ProjectCard.css';
import {withRouter} from 'react-router'

class ProjectCard extends React.Component{
  constructor(props){
    super(props)
  }
  handleClick=event=>{
    event.preventDefault();
    this.props.history.push(`/project/${this.props.project._id}`)
  }
  render(){
    return (
      <Card className="m-1 PjCard" onClick={this.handleClick}><Card.Body>
        <Row>
        <Col>
          <small className="text-muted">Project</small>
          <Card.Title>{this.props.project.title}</Card.Title></Col>
        <Col md="auto">
          <small className="text-muted">project end date</small>
          <Card.Subtitle className="mt-1">{moment(this.props.project.endDate).format('LL')}</Card.Subtitle></Col>
        <Col xs lg="2">
          <small className="text-muted">Backers</small>
          <Card.Text>? Backers</Card.Text>
        </Col>
        </Row>
        
  
  
      </Card.Body></Card>
    )
  }
  
}

export default withRouter(ProjectCard);