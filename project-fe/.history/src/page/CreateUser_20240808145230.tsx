// src/pages/CreateUser.tsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { User } from '../model/User';

const CreateUser: React.FC = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState<number>(0);
    const [phone, setPhone] = useState('');
    const [isOpen, setIsOpen] = useState(true); // Modal is open by default
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const userCreate: User = { name, age, phone };
        try {
            await ce
            navigate('/');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4">Create User</h1>
            <div className="space-y-4">
                <div>
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Age:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1">Phone:</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Create User
                </button>
            </div>
        </Modal>
    );
};

export default CreateUser;
