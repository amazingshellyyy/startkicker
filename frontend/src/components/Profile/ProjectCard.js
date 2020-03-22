import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';
import './ProjectCard.css';
import { withRouter } from 'react-router'

class ProjectCard extends React.Component {
  constructor(props) {
    super(props)
  }
  handleClick = event => {
    event.preventDefault();
    this.props.history.push(`/project/${this.props.project._id}`)
  }
  handlePrice = plans => {
    let amount = 0;
    plans.forEach(plan => {
      if (plan.project._id === this.props.project._id) {
        amount = plan.price
      } 
    })
    return amount;
  }
  displayInfo = ()=>{
  
    if(this.props.match.path === '/profile/:userId' && this.props.match.params.userId !== this.props.project.user){
      return (
        <>
        <small className="text-muted">Plan Price</small>
        <Card.Text>${this.handlePrice(this.props.selectPlan)}</Card.Text>
      </>
      )
    } else{
      return(
        <>
        <small className="text-muted">Backers</small>
        <Card.Text>{this.props.project.backersNum} Backers</Card.Text>
      </>
      )
    }
     
  }

  render() {
    return (
      <Card className="m-1 PjCard" onClick={this.handleClick}><Card.Body>
        <Row>
          <Col xs lg="2">
            <img className="pj-image" src={this.props.project.image} />
          </Col>
          <Col >
            <small className="text-muted">Project</small>
            <Card.Title>{this.props.project.title}</Card.Title></Col>
          <Col md="auto">
            <small className="text-muted">project end date</small>
            <Card.Subtitle className="mt-1">{moment(this.props.project.endDate).format('LL')}</Card.Subtitle></Col>
          <Col xs lg="2">{this.props.project &&this.displayInfo()}
          </Col>
        </Row>



      </Card.Body></Card>
    )
  }

}

export default withRouter(ProjectCard);