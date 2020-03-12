import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { withRouter } from "react-router";
import DatePicker from "react-day-picker";
import axios from 'axios';
import qs from 'query-string';

const emptyState = {
  title: '',
  subtitle: '',
  content: '',
  estDelivery: '',
  _id: ''
}

class CardForm extends React.Component {
  constructor(props){
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this);
    
    this.state = {
      ...emptyState
    }
  }


  

  handleDayClick(day, { selected, disabled }) {
    if (disabled) {
      // Day is disabled, do nothing
      return;
    }
    if (selected) {
      // Unselect the day if already selected
      this.setState({ estDelivery: undefined });
      return;
    }
    this.setState({ estDelivery: day });
    console.log(this.state.estDelivery)
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('nextProps', nextProps)
    console.log('prevState', prevState)
    if(nextProps.editPlan._id !== prevState._id){
      return {
        ...nextProps.editPlan
      }
    }  
  }

  handleAddPlan= event=>{
    event.preventDefault();
    console.log('projectId',this.props.match.params.projectId)
    console.log('UserId',this.props.curUser)
    axios.post(`${process.env.REACT_APP_API_URL}/plan/create`, {...this.state, project:this.props.match.params.projectId, user:this.props.curUser},{headers: {"authorization": `bearer ${localStorage.getItem('jwt')}`}})
      .then(res => {
        console.log(res.data)
        this.props.addPlan(res.data)
        this.setState({...emptyState})
      })
      .catch (err => {
        console.log(err.response)
      })
  }
  handleEditPlan = event => {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/plan/${this.state._id}`,this.state)
      .then(res => {
        console.log('edit is save',res.data)
        window.location = this.props.location.pathname
      })
      .catch(err => {
        console.log(err.response)
      })
  }
  handleCancel = event => {
    event.preventDefault();
    window.location = this.props.location.pathname
  }
  
  convertStringtoDate = (time)=>{
    const date = new Date(time);
    return date.toLocaleDateString();
  }

  render(){
    return (
      <Row className="">
        <Col></Col>
        <Col>
          <Card style={{ width: '40rem', minHeight: '20rem', margin:"10px" }}>
          <Card.Body>
          <Form >
            <Form.Group>
              <Form.Label className="text-muted" >Title</Form.Label>
              <Form.Control  type="text" name="title" placeholder="Pledge $10 for this award" value={this.state.title} onChange={this.handleChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group>
            <Form.Label className="text-muted" >Subtitle</Form.Label>
              <Form.Control size="sm" type="text" name="subtitle" placeholder="Subtitle" value={this.state.subtitle} onChange={this.handleChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group>
            <Form.Label className="text-muted" >Content</Form.Label>
              <Form.Control size="sm" as="textarea" rows="5" name="content" placeholder="What will be included in this awards?" value={this.state.content} onChange={this.handleChange}>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Container>
                <Row>
              <Col><Form.Label className="text-muted">Estimate Delivery</Form.Label></Col>
              <Col>
                  <div>
                  <DatePicker id="example-datepicker" onDayClick={this.handleDayClick} selectedDays={this.state.estDelivery} disabledDays={ {before: new Date()}} />
                  {this.state.estDelivery ? (
                    <p>You clicked {this.convertStringtoDate(this.state.estDelivery)}</p>
                  ) : (
                      <p>Please select a day.</p>
                    )}
                  </div></Col>
              <Col></Col>
              </Row>
              </Container>
              </Form.Group>
              {this.state._id ? <><Button variant="outline-primary" type="submit" onClick={this.handleEditPlan}>Save</Button><Button variant="outline-dark" type="submit" onClick={this.handleCancel}>Cancel</Button></>:<Button variant="outline-primary" type="submit" onClick={this.handleAddPlan}>Add</Button>}
              
              </Form>
          </Card.Body> </Card>
          
          
          
          
        
        
      
        </Col>
        <Col></Col>
      
      </Row>
    )
  }
  
}




export default withRouter(CardForm);