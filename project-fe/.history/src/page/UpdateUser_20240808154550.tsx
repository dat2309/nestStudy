// src/pages/UpdateUser.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isSuccess } from '../api/BaseResponse';
import { getUserDetails, updateUser } from '../api/UserApi';
import Modal from '../components/Modal';
import { User } from '../model/User';

const UpdateUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState('');
    const [age, setAge] = useState<number | 0>(0);
    const [phone, setPhone] = useState('');
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const response = await getUserDetails(Number(id));

                if (isSuccess(response)) {
                    const user: User = response.data;
                    setName(user.name);
                    setAge(user.age);
                    setPhone(user.phone);
                }

                else {
                    toast(response.message)
                }


            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const updatedUser: User = { name, age, phone };
        try {
            await updateUser(Number(id), updatedUser);
            navigate('/');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4">Update User</h1>
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
                    Update User
                </button>
            </div>
        </Modal>
    );
};

export default UpdateUser;
