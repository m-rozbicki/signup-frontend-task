import React from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
import { AuthenthicatedApp } from './AuthenthicatedApp';
import { AuthProvider, useAuth } from './services/Auth.context';
import { UnauthenthicatedApp } from './UnauthenthicatedApp';

const App = () => (
  <AuthProvider>
    <Router />
  </AuthProvider>
);

const Router = () => {
  const { user } = useAuth();

  return (
    <HashRouter>
      {
        user
          ? <AuthenthicatedApp />
          : <UnauthenthicatedApp />
      }
    </HashRouter>
  );
};

export default App;
