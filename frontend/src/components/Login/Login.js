import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


const Login = props => {
  return (
    <>
   
      <Container className="mt-5 pt-5">
        <Row>
          <Col></Col>
          <Col className="text-center">
            <h3 className="p-2">Login</h3>
            <Form className="text-left">
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" />
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


export default Login;