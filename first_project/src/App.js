import React from 'react';
import './App.css';
import NavBar from './nav';
import dashboard from './dashboard';
import { Route, Switch } from 'react-router-dom'
import cart from './cart';
import Error from './Error';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/' component={dashboard} />
        <Route exact path='/cart' component={cart} />
        <Route component={Error} />
      </Switch>
    </>
  )
}

export default App;
