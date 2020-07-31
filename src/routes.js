import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PreRegister from 'pages/PreRegister';
import Thanks from 'pages/Thanks';
import Login from 'pages/Login';
import Management from 'pages/Management';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={PreRegister} />
        <Route path='/thanks' exact component={Thanks} />
        <Route path='/login' exact component={Login} />
        <Route path='/management' exact component={Management} />
      </Switch>
    </BrowserRouter>
  );
}