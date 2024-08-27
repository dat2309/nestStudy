// src/components/UpdateUserModal.tsx
import React from 'react';
import { User } from '../model/User';
import ModalForm from './ModalForm';

interface UpdateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (event: React.FormEvent) => void;
    user: User;
    setUser: (user: User) => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ isOpen, onClose, onSubmit, user, setUser }) => {
    return (
        <ModalForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            user={user}
            setUser={setUser}
            title="Update User"
        />
    );
};

export default UpdateUserModal;
