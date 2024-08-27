import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { User } from './types'; // Adjust path to your User type

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
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

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">User List</h1>
            <div className="mb-4">
                <button onClick={() => handleSort('id')} className="btn">Sort by ID</button>
                <button onClick={() => handleSort('name')} className="btn">Sort by Name</button>
                <button onClick={() => handleSort('age')} className="btn">Sort by Age</button>
                <button onClick={() => handleSort('phone')} className="btn">Sort by Phone</button>
            </div>
            <ul>
                {users.map(user => (
                    <li key={user.id} className="mb-2 p-2 border rounded">
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Age: {user.age}</p>
                        <p>Phone: {user.phone}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
