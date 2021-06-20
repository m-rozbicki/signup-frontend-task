import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { worker } from './mocks/browser';
import './index.css';

const main = async () => {
  await worker.start({
    waitUntilReady: true,
    serviceWorker: {
      url: '/mockServiceWorker.js',
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
