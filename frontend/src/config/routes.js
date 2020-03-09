import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../components/Landing/Landing'
import Signup from '../components/Signup/Signup';
import Login from '../components/Login/Login';

export default ({ currentUser, setCurrentUser }) => (
  <Switch>
    <Route exact path='/' component={Landing} />
    <Route path='/signup' component={Signup} />
    <Route
      path='/login' component={Login}
    />
  
  </Switch>
);
