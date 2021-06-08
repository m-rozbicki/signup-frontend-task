import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signin">Sign In</Route>
        <Route path="/signup">Sign Up</Route>
        <Route path="/">Root</Route>
      </Switch>
    </Router>
  );
};

export default App;
