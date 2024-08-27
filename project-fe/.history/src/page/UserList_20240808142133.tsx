import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from './types'; // Adjust path to your User type

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortBy, setSortBy] = useState<string>('id');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');

  useEffect(() => {
    fetchUsers();
  }, [sortBy, sortOrder]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user', {
        params: {
          sort_by: sortBy,
          order: sortOrder,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleSort = (sortField: string) => {
    setSortBy(sortField);
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC'); // Toggle sort order
  };

  const handleViewDetails = async (id: number) => {
    try {
      const response = await axios.get(`/api/user/${id}/detail`);
      setSelectedUser(response.data.data);
    } catch (error) {
      console.error('Failed to fetch user details', error);
    }
  };

  const handleRemove = async (id: number) => {
    try {
      await axios.post('/api/user/remove', { id });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Failed to remove user', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">User List</h1>
      <div className="mb-4">
        <button onClick={() => handleSort('0')} className="btn">Sort by ID</button>
        <button onClick={() => handleSort('0')} className="btn">Sort by ID</button>
        <button onClick={() => handleSort('1')} className="btn">Sort by Name</button>
        <button onClick={() => handleSort('2')} className="btn">Sort by Age</button>
        <button onClick={() => handleSort('3')} className="btn">Sort by Phone</button>
      </div>
      <ul>
        {users.map(user => (
          <li key={user.id} className="mb-2 p-2 border rounded">
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Phone: {user.phone}</p>
            <button onClick={() => handleViewDetails(user.id)} className="btn mr-2">See Details</button>
            <button onClick={() => handleRemove(user.id)} className="btn bg-red-500 hover:bg-red-600">Remove</button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl mb-2">User Details</h2>
            <p>ID: {selectedUser.id}</p>
            <p>Name: {selectedUser.name}</p>
            <p>Age: {selectedUser.age}</p>
            <p>Phone: {selectedUser.phone}</p>
            <button onClick={() => setSelectedUser(null)} className="btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
