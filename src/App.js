import React, { Component } from 'react';
import Home from './views/Home'
import Welcome from './views/Welcome'
import Login from './views/Login'
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

class App extends Component {



  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <Home />
            </div>
          )} />
          
            <Route exact={true} path='/welcome' render={() => (
            <div className="App">
              <Welcome />
            </div>
          )} />
          <Route exact={true} path='/login' render={() => (
            <div className="App">
              <Login />
            </div>
          )} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
