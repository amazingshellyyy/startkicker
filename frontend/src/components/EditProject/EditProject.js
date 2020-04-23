import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import DatePicker from "react-day-picker";
import 'react-day-picker/lib/style.css'
import axios from 'axios';
import { withRouter } from "react-router";

class EditProject extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      editProject: {}
    }
  }
  

  handleSubmit = event => {
    const projectId = this.props.match.params.projectId;
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/project/${projectId}`, this.state.editProject,{headers: {"authorization": `bearer ${localStorage.getItem('jwt')}`,'Access-Control-Allow-Origin': '*'}} )
      .then(res => {
        this.props.history.push(`/project/${res.data._id}`)
      })
      .catch (err => {
        console.log(err.response)
      })
  }
  handleChange = event => {
    this.setState({
      editProject: {...this.state.editProject,
        [event.target.name]: event.target.value
      }
    })
  }
  componentDidMount(){
    
    const projectId = this.props.match.params.projectId;
    
    axios.get(`${process.env.REACT_APP_API_URL}/project/${projectId}`,{headers: {"authorization": `bearer ${localStorage.getItem('jwt')}`,'Access-Control-Allow-Origin': '*'}})
      .then(res => {
        const endDate = new Date(res.data.endDate);
        if (res.data.user._id !== this.props.curUser) {
          this.props.history.push(`/project/${projectId}`)
        }
        this.setState({
          editProject: {...res.data, endDate}
        })
      })
      .catch (err => {
        console.log(err.response)
      })
      
  }
  handleDayClick(day, { selected, disabled }) {
    if (disabled) {
      // Day is disabled, do nothing
      return;
    }
    if (selected) {
      // Unselect the day if already selected
      this.setState({ 
        editProject: {...this.state.editProject, endDate: undefined} });
      return;
    }
    this.setState({ 
      editProject: {...this.state.editProject, endDate: day} });
  }
  convertStringtoDate = (time)=>{
    const date = new Date(time);
    return date.toLocaleDateString();
  }
  
  render(){
    return(
      <>

        <Container className="mt-5 pt-5">
          <Row>
            <Col></Col>
            <Col className="text-center">
              <h3 className="p-2">Create a project</h3>
              <Form className="text-left" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasictitle">
                  <Form.Control type="text" name="title" placeholder="Enter Project title" onChange={this.handleChange} value={this.state.editProject.title}/>
                </Form.Group>
                <Form.Group controlId="formBasiccontent">
                  <Form.Control as="textarea" rows="10" name="content" placeholder="Tell us about your project!" onChange={this.handleChange} value={this.state.editProject.content}/>
                </Form.Group>

                <Form.Label htmlFor="goal">Your Goal to kick off your project</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl name='goal' onChange={this.handleChange} id='goal' value={this.state.editProject.goal}/>
                  <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                {/* <Form.Group controlId="formBasiccendDate">
                  <Form.Control type="date" name="endDate" min={this.getcurrentDate()} onChange={this.handleChange} />
                </Form.Group> */}
                <Form.Group>
                  <Form.Label>Label</Form.Label>
                  <DatePicker id="example-datepicker" onDayClick={this.handleDayClick} selectedDays={this.state.editProject.endDate} disabledDays={ {before: new Date()}}/>
                  {this.state.editProject.endDate ? (
                    <p>You clicked {this.convertStringtoDate(this.state.editProject.endDate)}</p>
                  ) : (
                      <p>Please select a day.</p>
                    )}
                </Form.Group>
                <Button className="" variant="primary" type="submit">
                  Submit
                </Button>
              </Form></Col>
            <Col></Col>

          </Row>
        </Container>
      </>
    )
  }
}


export default withRouter(EditProject);