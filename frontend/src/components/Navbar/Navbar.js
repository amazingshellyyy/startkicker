import React from 'react';
import { Nav, Navbar, Form, NavDropdown, FormControl, Button } from 'react-bootstrap'

const Navig = props => {
  return (
    <Navbar bg="light" expand="lg">
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Explore</Nav.Link>
          <Nav.Link href="#link">Start a project</Nav.Link>
        </Nav>
        <Navbar.Brand href="#home" className="ml-auto mr-auto">Startkicker</Navbar.Brand>
        <Nav className="ml-auto">
        {/* <Form inline className="mr-sm-2">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form> */}
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Signup</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav>
        
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navig;