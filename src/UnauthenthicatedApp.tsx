import React from 'react';
import { Switch, Route, SwitchProps } from 'react-router-dom';
import { Signin } from './signin/Signin/Signin.component';
import { Signup } from './signup/Signup/Signup.component';

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
