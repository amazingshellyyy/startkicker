import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from '../components/Landing/Landing'
import Signup from '../components/Signup/Signup';
import Login from '../components/Login/Login';
import Payment from '../components/Payment/Payment'

export default ({ isLogin, setCurrentUser }) => (
  <Switch>
    <Route exact path='/' component={Landing} />
    <Route path='/signup' render={() => (<Signup isLogin={isLogin} setCurrentUser={setCurrentUser}/>)} />
    <Route
      path='/login' render={() => (<Login isLogin={isLogin} setCurrentUser={setCurrentUser}/>)}
    />
    <Route
      path='/payment' component={Payment}
    />
  </Switch>
);

