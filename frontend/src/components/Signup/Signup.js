import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from "react-router";

class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: ''
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('username',this.state.username)
    console.log('email',this.state.email)
    console.log('password',this.state.password)
  }
  handleSubmit = event => {
    event.preventDefault();
    console.log('hiiii')
    console.log('bodytosend',this.state);
    // axios.post(`${process.env.REACT_APP_API_URL}/pay/createCustomer`,{email: this.state.email, username: this.state.username})
    //   .then(res => {
    //     console.log(res.data)
    //   })
    //   .catch(err => {
    //     console.log(err.response)
    //   })

    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, this.state)
      .then(res => {
        console.log(res.data.jwt)
        let jwt = res.data.jwt
        this.props.setCurrentUser(jwt, res.data.userId);
        this.props.history.goBack();
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  render(){
    return (
      <>
     
        <Container className="mt-5 pt-5">
          <Row>
            <Col></Col>
            <Col className="text-center">
              <h3 className="p-2">Signup</h3>
              <Form className="text-left" onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicUsername">
                  <Form.Control type="text" name="username" placeholder="Enter username" onChange={this.handleChange}/>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange}/>
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                </Form.Group>
                <Button className="" variant="primary" type="submit" >
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


export default withRouter(Signup);