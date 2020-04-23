import React from 'react';
import PlanCard from './PlanCard';
import CardForm from './CardForm';
import axios from 'axios';
import { withRouter } from "react-router";
import {Container,Row, Col, Button} from 'react-bootstrap'
import qs from 'query-string';

class PlanList extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      plans: this.props.plans,
      isLoading: true,
      EditId: '',
      editPlan: {}
    }
  }
  

  componentDidMount(){
    const projectId = this.props.match.params.projectId
    axios.get(`${process.env.REACT_APP_API_URL}/plan/all/${projectId}`,{headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res => {
        this.setState({
          plans: res.data,
          isLoading: false
        })
      })
      .catch(err => {
        console.log(err.response)
      })
  }
  displayPlans=plans => {
    return plans.map(plan => {
      return <PlanCard handleSelect={this.props.handleSelect} key={plan._id} plan={plan} curUser={this.props.curUser} addPlan={this.addPlan.bind(this)} updateEditPlan={this.updateEditPlan.bind(this)}/>
    })
  }
addPlan(plan){
  this.setState({
    plans: [...this.state.plans, plan]
  })
}
updateEditPlan= (id) => {
  this.setState({
    EditId: id
  })
  
  axios.get(`${process.env.REACT_APP_API_URL}/plan/${id}`,{headers: {'Access-Control-Allow-Origin': '*'}})
    .then(res => {
      this.setState({
        editPlan: res.data
      })
    })
    .catch(err => {
      console.log(err.response)
    })
}

handleFinish = event => {
  const projectId = this.props.match.params.projectId
  event.preventDefault();
  this.props.history.push(`/project/${projectId}`)
}


  render(){
    return(
      <Container className="mt-5">
        <Row>
           {(this.props.location.pathname[1]==="c")&&
           <Col>
            <CardForm curUser={this.props.curUser} addPlan={this.addPlan.bind(this)} editPlan={this.state.editPlan}/>
          </Col>}
          
          <Col>
          { this.state.isLoading? <div>You don't have any plans for this project yet</div>: this.displayPlans(this.state.plans) }
          {(this.props.location.pathname[1]==="c")&& <Button variant="outline-primary" className="ml-5" onClick={this.handleFinish}>Finish </Button>}
         
          </Col>
        </Row>
        
        
      
     
      
      </Container>
    )
  }
}


export default withRouter(PlanList);