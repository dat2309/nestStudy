import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetails, getUsers, removeUser } from '../api/UserApi';
import { User } from '../model/User';
import { isSuccess } from '../api/BaseResponse';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>(new User());
    const [sortBy, setSortBy] = useState<string>('-1');
    const navigate = useNavigate();
    const fetchUsers = async () => {
        try {
            const response = await getUsers(sortBy)
            if(isSuccess(response))
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [sortBy]);

    const handleSort = (sortField: string) => {
        setSortBy(sortField);
    };

    const handleViewDetails = async (id: number) => {
        if (id !== 0) {
            try {
                const response = await getUserDetails(id);
                setSelectedUser(response);
            } catch (error) {
                console.error('Failed to fetch user details', error);
            }
        }

    };

    const handleRemove = async (id: number) => {
        try {
            await removeUser(id)
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Failed to remove user', error);
        }
    };
    const handleCreateUser = () => {
        navigate('/create'); // Navigate to Create User page
    };

    const handleUpdateUser = () => {
        navigate(`/update/${selectedUser.id}`); // Navigate to Update User page with selectedUser's ID
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">User List</h1>
            <div className="mb-4">
                <button onClick={handleCreateUser} className="btn bg-green-500 hover:bg-green-600">
                    Create User
                </button>
                <div className="mt-4">
                    <button onClick={() => handleSort('-1')} className="btn">Default</button>
                    <button onClick={() => handleSort('0')} className="btn">Sort by ID</button>
                    <button onClick={() => handleSort('1')} className="btn">Sort by Name</button>
                    <button onClick={() => handleSort('2')} className="btn">Sort by Age</button>
                    <button onClick={() => handleSort('3')} className="btn">Sort by Phone</button>
                </div>
            </div>
            <ul>
                {users.map(user => (
                    <li key={user.id} className="mb-2 p-2 border rounded">
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Age: {user.age}</p>
                        <p>Phone: {user.phone}</p>
                        <button onClick={() => handleViewDetails(user.id ?? 0)} className="btn mr-2">See Details</button>
                        <button onClick={() => handleRemove(user.id ?? 0)} className="btn bg-red-500 hover:bg-red-600">Remove</button>
                    </li>
                ))}
            </ul>

            {selectedUser.id && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg">
                        <h2 className="text-xl mb-2">User Details</h2>
                        <p>ID: {selectedUser.id}</p>
                        <p>Name: {selectedUser.name}</p>
                        <p>Age: {selectedUser.age}</p>
                        <p>Phone: {selectedUser.phone}</p>
                        <button onClick={() => setSelectedUser(new User())} className="btn mr-2">Close</button>
                        <button onClick={handleUpdateUser} className="btn bg-blue-500 hover:bg-blue-600">Update</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
