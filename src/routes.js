import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PreRegister from 'pages/PreRegister';
import Login from 'pages/Login'
import { sessionService } from 'redux-react-session'
import Home from 'pages/Home';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={PreRegister} />
        {/* THIS IS TEMPORARY, JUST FOR HOMOLOGATION */}
        <Route /* onEnter={sessionService.checkAuth} */ path='/panel' exact component={Home} />
        <Route path='/login' exact component={Login} />
      </Switch>
    </BrowserRouter>
  );
}