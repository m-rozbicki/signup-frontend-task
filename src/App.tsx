import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Signup from './signup/Signup/Signup';

const App = () => (
  <Router>
    <Switch>
      <Route path="/signin">Sign In</Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/">Root</Route>
    </Switch>
  </Router>
);

export default App;
