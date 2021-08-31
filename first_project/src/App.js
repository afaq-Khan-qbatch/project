import React from 'react';
import './App.css';
import NavBar from './nav';
import dashboard from './dashboard';
import { Route, Switch } from 'react-router-dom'
import Cart from './cart';
import Error from './Error';
import SignIn from './singin';
import SignUp from './signUp';

function App() {

  return (
    <>
      <NavBar />
      <SignIn />
      <Switch>
        <Route exact path='/cart' component={Cart} />
        <Route exect path='/' component={dashboard} />
        <Route component={Error} />
      </Switch>

    </>
  )
}

export default App;
