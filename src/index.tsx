import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { worker } from './mocks/browser';
import './index.css';

const main = async () => {
  if (window.location.pathname === '/orm-frontend-task') {
    window.location.pathname += '/';
    return;
  }

  await worker.start({
    waitUntilReady: true,
    serviceWorker: {
      url: '/orm-frontend-task/mockServiceWorker.js',
    },
  });

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

main();
