// This is React's starting point: it finds the HTML mount spot and asks React to draw the app there.
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';

// StrictMode helps surface common development mistakes while leaving the production page unchanged.
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
