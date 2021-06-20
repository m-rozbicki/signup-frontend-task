import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { worker } from './mocks/browser';
import './index.css';

const main = async () => {
  if (window.location.pathname === `/${process.env.REACT_APP_MSW_PATHNAME}`) {
    window.location.pathname += '/';
    return;
  }

  await worker.start({
    waitUntilReady: true,
    serviceWorker: {
      url: `/${process.env.REACT_APP_MSW_PATHNAME}/mockServiceWorker.js`,
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
