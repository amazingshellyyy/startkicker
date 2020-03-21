import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class Navig extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return (
      <Navbar bg="light" expand="lg">
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          
          <NavLink className="nav-link" to='/create/project'>Start a project</NavLink>
          <NavLink className="nav-link" to='/explore'>Explore</NavLink>
            
          </Nav>
          <NavLink to="/">
          <Navbar.Brand className="ml-auto mr-auto">Startkicker</Navbar.Brand></NavLink>
          <Nav className="ml-auto">
          {/* <Form inline className="mr-sm-2">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          { this.props.isLogin ?  <><NavLink className="nav-link" to={`/profile/${this.props.curUser}`}>Dashboard</NavLink>
          <NavLink className="nav-link" to='/' onClick={this.props.handleLogout}>Logout</NavLink></> : <><NavLink className="nav-link" to='/login'>Login</NavLink>
          <NavLink className="nav-link" to='/signup'>Signup</NavLink></>}
          
         
          
          </Nav>
          
        </Navbar.Collapse>
      </Navbar>
    )
  }
  
}

export default Navig;