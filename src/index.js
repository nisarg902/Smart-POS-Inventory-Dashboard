import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie'; // Ye line add karein

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Poore App ko CookiesProvider mein wrap karein */}
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>
);