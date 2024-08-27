// src/components/CreateUserModal.tsx
import React from 'react';
import { User } from '../model/User';
import ModalForm from './ModalForm';

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (event: React.FormEvent) => void;
    user: User;
    setUser: (user: User) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose, onSubmit, user, setUser }) => {
    return (
        <ModalForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            user={user}
            setUser={setUser}
            title="Create User"
        />
    );
};

export default CreateUserModal;
