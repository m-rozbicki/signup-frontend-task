import React from 'react';
import { Switch, Route, SwitchProps } from 'react-router-dom';
import './App.css';
import Signin from './signin/Signin/Signin';
import Signup from './signup/Signup/Signup';

const UnauthenthicatedApp = (props: SwitchProps) => (
  <Switch {...props}>
    <Route path="/signin">
      <Signin />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route path="*">
      <Signin />
    </Route>
  </Switch>
);

export {
  UnauthenthicatedApp,
};
