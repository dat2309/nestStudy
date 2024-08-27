import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import UserList from './page/UserList';



const App: React.FC = () => {
  return (
    <div className="relative"> {/* Ensure App has relative positioning */}
    {/* Your app components go here */}
    <ToastContainer className="fixed bottom-4 right-4 z-50" />
  </div>
   
  );
};

export default App;
