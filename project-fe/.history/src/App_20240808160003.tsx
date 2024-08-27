import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import UserList from './page/UserList';
import CreateUser from './page/CreateUser';
import UpdateUser from './page/UpdateUser';


const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
      
        </Routes>
      </div>
    </Router>
  );
};

export default App;
