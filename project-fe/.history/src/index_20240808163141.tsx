import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';
const toastContainerStyle = {
  position: 'fixed',
  top: '20px',  // Adjust as needed
  right: '20px', // Adjust as needed
  zIndex: 9999
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>

    <App />
    <ToastContainer className="fixed bottom-4 right-4 z-50" />
  </React.StrictMode>
);
