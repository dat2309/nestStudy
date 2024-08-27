// src/components/ModalForm.tsx
import React from 'react';
import { User } from '../model/User';
import Modal from './Modal';

interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (event: React.FormEvent) => void;
    user: User;
    setUser: (user: User) => void;
    title: string;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose, onSubmit, user, setUser, title }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit}>
            <div className="relative bg-white">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    &times;
                </button>
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Name:</label>
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Age:</label>
                        <input
                            type="number"
                            value={user.age}
                            onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Phone:</label>
                        <input
                            type="text"
                            value={user.phone}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {title}
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {title}
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default ModalForm;
