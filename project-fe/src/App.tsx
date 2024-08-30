import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './index.css';
import LoginPage from './page/LoginPage';
import UserListPage from './page/UserListPage';



const App: React.FC = () => {
  return (
    <div className="relative"> {/* Ensure App has relative positioning */}
      <Router >
        <div className="w-screen h-screen ">

          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/user" element={<UserListPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer position='bottom-right' autoClose={1000} />
    </div>

  );
};

export default App;

