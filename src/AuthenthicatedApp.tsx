import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Hello } from './home/Hello.component';

const AuthenthicatedApp = () => (
  <Switch>
    <Route path="*">
      <Hello />
    </Route>
  </Switch>
);

export {
  AuthenthicatedApp,
};
