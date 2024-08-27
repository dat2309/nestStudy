import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserDetailPopup from '../components/UserDetailPopup';


interface User {
    id: number;
    name: string;
    age: number;
    phone: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        axios.get<User[]>('http://localhost:3000/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const openPopup = (user: User) => {
        setSelectedUser(user);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <ul className="space-y-4">
                {users.map(user => (
                    <li key={user.id} className="p-4 border rounded shadow-md">
                        <p className="font-semibold">Name: {user.name}</p>
                        <p>Age: {user.age}</p>
                        <p>Phone: {user.phone}</p>
                        <button
                            onClick={() => openPopup(user)}
                            className="mt-2 mr-2 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            See Details
                        </button>
                        <button
                            onClick={() => handleDelete(user.id)}
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            {isPopupOpen && selectedUser && (
                <UserDetailPopup user={selectedUser} onClose={closePopup} />
            )}
        </div>
    );
};

export default UserList;
