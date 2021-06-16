import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Signup from './signup/Signup/Signup';

const App = () => (
  <Router>
    <Switch>
      <Route path="/signin">Sign In</Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/">
        <Signup />
      </Route>
    </Switch>
  </Router>
);

export default App;