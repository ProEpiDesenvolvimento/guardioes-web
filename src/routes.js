import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from 'pages/Home';
import Login from 'pages/Login'
import Statistics from 'pages/Statistics'
import Contato from 'pages/Contato'
import { sessionService } from 'redux-react-session'
import Panel from 'pages/Panel';
import ResetPwd from 'pages/ResetPwd';
import ChangePwd from 'pages/ChangePwd';


export default function Routes({token}) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route onEnter={sessionService.checkAuth} path='/panel' exact component={Panel} />
        <Route path='/statistics' exact component={Statistics} />
        <Route path='/login' exact component={Login} />
        <Route path='/reset' exact component={ResetPwd} />
        <Route path='/change' exact component={ChangePwd} />
        <Route path='/contact' exact component={Contato} />
      </Switch>
    </BrowserRouter>
  );
}