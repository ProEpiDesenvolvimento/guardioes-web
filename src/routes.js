import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PreRegister from 'pages/PreRegister';
import Login from 'pages/Login'
import Home from 'pages/Home';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={PreRegister} />
        <Route path='/panel' exact component={Home} />
        <Route path='/login' exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
}