import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/Auth.context';
import { AuthenthicatedApp } from './AuthenthicatedApp';
import { UnauthenthicatedApp } from './UnauthenthicatedApp';

const App = () => (
  <AuthProvider>
    <HashRouter>
      <TransitionSwitch />
    </HashRouter>
  </AuthProvider>
);

const TransitionSwitch = () => {
  const { user } = useAuth();

  return (
    <>
      {
        user
          ? <AuthenthicatedApp />
          : <UnauthenthicatedApp />
      }
    </>
  );
};

export {
  App,
};
