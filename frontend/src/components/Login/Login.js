import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from "react-router";

class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state.email)
    console.log(this.state.password)
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, this.state)
      .then(res => {
        console.log(res.data.jwt)
        let jwt = res.data.jwt;
        this.props.setCurrentUser(jwt, res.data.userId);
        this.props.history.push( `/profile/${res.data.userId}`);
      })
      .catch(err => {
        console.log(err.response)
      })
  }



  render(){
    return (
      <>
     
        <Container className="mt-5 pt-5" style={{minHeight:'75vh'}}>
          <Row>
            <Col xs={1} md={4}></Col>
            <Col xs={10} md={4} className="text-center">
              <h3 className="p-2">Welcome Back</h3>
              <Form className="text-left" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" name="email" placeholder="Email" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                </Form.Group>
                <hr className="mt-4"></hr>
                <Button className="mt-4 btn-block" variant="outline-primary" type="submit">
                  Login
                </Button>
              </Form></Col>
            <Col xs={1} md={4}></Col>
  
          </Row>
        </Container>
      </>
    )
  }
  
}


export default withRouter(Login);