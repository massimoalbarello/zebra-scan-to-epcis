import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { IdentifierContextProvider } from './identifier-context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <IdentifierContextProvider>
    <App />
  </IdentifierContextProvider>
);