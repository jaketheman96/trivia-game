import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" />
      </Switch>
    );
  }
}

export default App;
