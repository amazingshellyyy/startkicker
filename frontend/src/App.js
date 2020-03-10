import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Naviga from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './config/routes';
import { withRouter } from "react-router";


class App extends Component {
  state = {
    isLogin: false
  }

  componentDidMount (){
    this.setCurrentUser(localStorage.getItem('jwt'))
  }
  
  setCurrentUser = jwt => {
    console.log('get jwt and set user');
    if (jwt) {
      this.setState({
        isLogin: true
      })
      localStorage.setItem('jwt', jwt);
    }
  }
  handleLogout (){
    localStorage.removeItem('jwt');
    this.setState({
      isLogin: false
    })

  }
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
      <Naviga isLogin={this.state.isLogin} setCurrentUser={this.setCurrentUser} handleLogout={this.handleLogout.bind(this)}/>
     
      
      <Routes isLogin={this.state.isLogin} setCurrentUser={this.setCurrentUser} handleLogout={this.handleLogout}/>
        <button onClick={this.handletest}>get req</button>
        
    </>
  );
}
}

export default withRouter(App);
