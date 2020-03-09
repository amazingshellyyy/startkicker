import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Naviga from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './config/routes';
import {Caontainer, Row, Col } from 'react-bootstrap';


class App extends Component {


  handletest= event => {
    event.preventDefault();
    axios.get(`${process.env.REACT_APP_URL}/`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err.response)
    })
  }
 
render(){

  return (
    <>
      <Naviga />
      <Routes />
        <button onClick={this.handletest}>get req</button>
        
    </>
  );
}
}

export default App;
