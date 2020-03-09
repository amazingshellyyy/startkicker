import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello</h1>
        <button onClick={this.handletest}>get req</button>
      </header>
    </div>
  );
}
}

export default App;
