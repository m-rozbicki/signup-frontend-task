import React from 'react';
import { Switch, Route, SwitchProps } from 'react-router-dom';
import { Hello } from './hello/Hello.component';

const AuthenthicatedApp = (props: SwitchProps) => (
  <Switch {...props}>
    <Route path="*">
      <Hello />
    </Route>
  </Switch>
);

export {
  AuthenthicatedApp,
};
