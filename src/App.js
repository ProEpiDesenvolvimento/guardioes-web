import React, { Component } from 'react';
import Home from './views/Home'
import Welcome from './views/Welcome'
import Login from './views/Login'
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    
    return (
      <BrowserRouter>
        <div>
          <Route exact location={this.props.location} path='/' component={Login}/>
          <Route location={this.props.location} path='/home' component={Home}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
