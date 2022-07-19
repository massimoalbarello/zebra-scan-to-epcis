import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BarcodeContextProvider } from './barcode-context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BarcodeContextProvider>
    <App />
  </BarcodeContextProvider>
);