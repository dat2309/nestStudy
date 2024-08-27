import React from 'react';

interface User {
    id: number;
    name: string;
    age: number;
    phone: string;
}

interface UserDetailPopupProps {
    user: User;
    onClose: () => void;
}

const UserDetailPopup: React.FC<UserDetailPopupProps> = ({ user, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">User Details</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default UserDetailPopup;
