import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import DatePicker from "react-day-picker";
import 'react-day-picker/lib/style.css'
import axios from 'axios';
import { withRouter } from "react-router";
import checkIfUserIsLoggedIn from '../../Wrapper/checkIfUserIsLoggedIn';
import PlanList from '../../Plan/PlanList';

class ProjectForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      projectId: '',
      title: '',
      content: '',
      goal: 0,
      endDate: undefined,
      show: false,
      image:''
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/project/create`, this.state, { headers: { "authorization": `bearer ${localStorage.getItem('jwt')}`,'Access-Control-Allow-Origin': '*' } })
      .then(res => {
        this.setState({
          show: true,
          projectId: res.data._id
        })


      })
      .catch(err => {
        console.log(err.response)
      })

  }
  handleDayClick(day, { selected, disabled }) {
    if (disabled) {
      return;
    }
    if (selected) {
      this.setState({ endDate: undefined });
      return;
    }
    this.setState({ endDate: day });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleNext = event => {
    event.preventDefault();
    this.props.history.push(`/create/project/${this.state.projectId}/plan`)
  }

  render() {
    return (
      <>

        <Container className="mt-5 mb-5 pb-5 pt-3" style={{minHeight:"86vh"}}>
          <Row>
            <Col></Col>
            <Col className="text-center">
              <h3 className="p-2">Create a project</h3>
              <Form className="text-left" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasictitle">
                  <Form.Control type="text" name="title" placeholder="Enter Project title" onChange={this.handleChange} />
                </Form.Group>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Image URL"
                    name="image"
                    onChange={this.handleChange}
                  />
                </InputGroup>
                <Form.Group controlId="formBasiccontent">
                  <Form.Control as="textarea" rows="10" name="content" placeholder="Tell us about your project!" onChange={this.handleChange} />
                </Form.Group>

                <Form.Label htmlFor="goal">Your Goal to kick off your project</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl name='goal' onChange={this.handleChange} id='goal' />
                  <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                {/* <Form.Group controlId="formBasiccendDate">
                  <Form.Control type="date" name="endDate" min={this.getcurrentDate()} onChange={this.handleChange} />
                </Form.Group> */}
                <Form.Group>
                  <Form.Label>Label</Form.Label>
                  <DatePicker id="example-datepicker" onDayClick={this.handleDayClick} selectedDays={this.state.endDate} disabledDays={{ before: new Date() }} />
                  {this.state.endDate ? (
                    <p>You clicked {this.state.endDate.toLocaleDateString()}</p>
                  ) : (
                      <p>Please select a day.</p>
                    )}
                </Form.Group>
                {this.state.show ? <Button variant="outline-primary" onClick={this.handleNext}>Next: create plans</Button> : <Button variant="primary" type="submit">
                  Save
                </Button>}



              </Form></Col>
            <Col></Col>

          </Row>

        </Container>
      </>
    )
  }
}


export default withRouter(checkIfUserIsLoggedIn(ProjectForm));