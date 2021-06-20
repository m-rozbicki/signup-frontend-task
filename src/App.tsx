import React, { useRef } from 'react';
import { HashRouter, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { AuthProvider, useAuth } from './services/Auth.context';
import { AuthenthicatedApp } from './AuthenthicatedApp';
import { UnauthenthicatedApp } from './UnauthenthicatedApp';
import styles from './App.module.scss';

const App = () => (
  <AuthProvider>
    <HashRouter>
      <TransitionSwitch />
    </HashRouter>
  </AuthProvider>
);

const TransitionSwitch = () => {
  const { user } = useAuth();
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames={{
          enter: styles['fade--enter'],
          enterActive: styles['fade--enter-active'],
        }}
        timeout={350}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className={styles['transition-container']}>
          {
            user
              ? <AuthenthicatedApp location={location} />
              : <UnauthenthicatedApp location={location} />
          }
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
