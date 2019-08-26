import React from 'react';
import Home from './views/Home'
import Login from './views/Login'
import { Route } from 'react-router-dom';
import './App.css';
import { withCookies } from 'react-cookie';

function App(props) {
  return (
    <div>
      <Route
        exact
        location={props.location}
        path='/'
        render={() => (
          <Login cookies={props.cookies} />
        )} />
      <Route
        location={props.location}
        path='/home'
        render={() => <Home cookies={props.cookies} />}
      />
    </div>
  );
};

export default withCookies(App);
