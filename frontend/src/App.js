import React, { Component } from 'react';
import Naviga from './components/Navbar/Navbar';
import Routes from './config/routes';
import { withRouter } from "react-router";
import jwt from 'jsonwebtoken';
import Footer from './components/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  state = {
    isLogin: false,
    curUser: '',
  }

  componentDidMount() {
    let token = localStorage.getItem('jwt');
    if (token) {
      let userId = jwt.decode(token).foo
      this.setCurrentUser(token, userId)
    }

  }

  setCurrentUser = (jwt, userId) => {
    if (jwt) {
      this.setState({
        isLogin: true,
        curUser: userId
      })
      localStorage.setItem('jwt', jwt);
    }
  }
  handleLogout() {
    localStorage.removeItem('jwt');
    this.setState({
      isLogin: false,
      curUser: ''
    })

  }



  render() {

    return (
      <>
        <Naviga isLogin={this.state.isLogin} curUser={this.state.curUser} setCurrentUser={this.setCurrentUser} handleLogout={this.handleLogout.bind(this)} />


        <Routes isLogin={this.state.isLogin} setCurrentUser={this.setCurrentUser} handleLogout={this.handleLogout} curUser={this.state.curUser} />
        <Footer/>

      </>
    );
  }
}

export default withRouter(App);
