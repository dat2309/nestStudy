import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
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
    <ToastContainer className="custom-toast-container" />
  </React.StrictMode>
);
