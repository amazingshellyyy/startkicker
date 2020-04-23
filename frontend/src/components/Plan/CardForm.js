import React from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { withRouter } from "react-router";
import DatePicker from "react-day-picker";
import axios from 'axios';
import qs from 'query-string';

const emptyState = {
  price: 0,
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
      return;
    }
    if (selected) {
      this.setState({ estDelivery: undefined });
      return;
    }
    this.setState({ estDelivery: day });
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.editPlan._id !== prevState._id){
      return {
        ...nextProps.editPlan
      }
    }  
  }

  handleAddPlan= event=>{
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/plan/create`, {...this.state, project:this.props.match.params.projectId, user:this.props.curUser},{headers: {"authorization": `bearer ${localStorage.getItem('jwt')}`,'Access-Control-Allow-Origin': '*'}})
      .then(res => {

        this.props.addPlan(res.data)
        this.setState({...emptyState})
      })
      .catch (err => {
        console.log(err.response)
      })
  }
  handleEditPlan = event => {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/plan/${this.state._id}`,this.state,{headers: {'Access-Control-Allow-Origin': '*'}})
      .then(res => {

        this.setState({...emptyState})
        window.location = `http://localhost:3000/create/project/${res.data.project}/plan`;
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
          <label className="text-muted" htmlFor="price">Price</label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>US$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control  id='price' type="text" name="price" placeholder="price for this plan" value={this.state.price} onChange={this.handleChange}>
              </Form.Control>
            </InputGroup>
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