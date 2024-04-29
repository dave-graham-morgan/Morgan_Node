import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import registerServiceWorker from './registerServiceWorker.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
registerServiceWorker();
