import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './index.css';
import UserList from './page/UserList';



const App: React.FC = () => {
  return (
    <div className="relative"> {/* Ensure App has relative positioning */}
      <Router>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">User Management</h1>
          <Routes>
            <Route path="/" element={<UserList />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer position='bottom-right' autoClose={2000} />
    </div>

  );
};

export default App;
