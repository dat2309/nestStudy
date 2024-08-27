import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { isSuccess } from '../api/BaseResponse';
import { createUser, getUserDetails, getUsers, removeUser, updateUser } from '../api/UserApi';
import CreateUserModal from '../components/CreateUserModal';
import UpdateUserModal from '../components/UpdateUserModal';
import { User } from '../model/User';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>(new User());
    const [sortBy, setSortBy] = useState<string>('-1');
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState<number | 0>(0);
    const [phone, setPhone] = useState('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const isSelected = (sortField: string) => sortBy === sortField;
    const debounceInput = (value: string, delay: number) => {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);

        return debouncedValue;
    };
    const debouncedSearch = debounceInput(searchQuery, 500);
   
    const fetchUsers = async () => {
        try {
            const response = await getUsers(searchQuery, sortBy)
            if (isSuccess(response))
                setUsers(response.data);
            else {
                toast.error(response.message)
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [sortBy, debouncedSearch]);

    const handleSort = (sortField: string) => {
        setSortBy(sortField);
    };

    const handleViewDetails = async (id: number) => {
        if (id !== 0) {
            try {
                const response = await getUserDetails(id);
                if (isSuccess(response)) {
                    setSelectedUser(response.data);
                    setIsShowDetail(true)
                }
                else {
                    toast.error(response.message)
                }

            } catch (error) {
                console.error('Failed to fetch user details', error);
            }
        }

    };

    const handleRemove = async (id: number) => {
        try {

            const response = await removeUser(id);
            if (isSuccess(response)) {
                toast.success("Xoá user thành công")
                setUsers(users.filter(user => user.id !== id));
            }

        } catch (error) {
            console.error('Failed to remove user', error);
        }
    };

    const handleCreateUserSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newUser: User = { name, age, phone };
        try {
            const response = await createUser(newUser);
            if (isSuccess(response)) {
                setIsCreateModalOpen(false);
                setName('');
                setAge(0);
                setPhone('');
                setSelectedUser(new User())
                fetchUsers(); // Refresh user list
                toast.success("Tạo user thành công")
            }
            else {
                toast.error(response.message)
            }


        } catch (error) {
            console.error('Error creating user:', error);
        }
    };
    const handleCreateUser = () => {
        setName('');
        setAge(0);
        setPhone('');
        setIsCreateModalOpen(true);
    };

    const handleUpdateUser = () => {
        setName(selectedUser.name);
        setAge(selectedUser.age);
        setPhone(selectedUser.phone);
        setIsShowDetail(false)
        setIsUpdateModalOpen(true);
    };
    const handleUpdateUserSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const updatedUser: User = { ...selectedUser, name, age, phone };
        try {
            const response = await updateUser(Number(selectedUser.id), updatedUser);
            if (isSuccess(response)) {
                setIsUpdateModalOpen(false);
                setName('');
                setAge(0);
                setPhone('');
                setSelectedUser(new User())
                toast.success("Cập nhật user thành công")
                fetchUsers(); // Refresh user list
            }
            else {
                toast.error(response.message)
            }


        } catch (error) {
            console.error('Error updating user:', error);
        }
    }
    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">User List</h1>
            <div className="mb-4">
                <button onClick={handleCreateUser} className="btn bg-green-500 hover:bg-green-600">
                    Tạo user
                </button>
                <div className="mt-4 space-x-2">
                    <button
                        onClick={() => handleSort('-1')}
                        className={`btn ${isSelected('-1') ? 'font-bold' : ''}`}
                    >
                        Sort
                    </button>
                    <button
                        onClick={() => handleSort('0')}
                        className={`btn ${isSelected('0') ? 'font-bold' : ''}`}
                    >
                        ID
                    </button>
                    <button
                        onClick={() => handleSort('1')}
                        className={`btn ${isSelected('1') ? 'font-bold' : ''}`}
                    >
                        Name
                    </button>
                    <button
                        onClick={() => handleSort('2')}
                        className={`btn ${isSelected('2') ? 'font-bold' : ''}`}
                    >
                        Age
                    </button>
                    <button
                        onClick={() => handleSort('3')}
                        className={`btn ${isSelected('3') ? 'font-bold' : ''}`}
                    >
                        Phone
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border rounded p-2 mb-2 w-full"
                    />
                    <button onClick={fetchUsers} className="btn bg-blue-500 hover:bg-blue-600">
                        Search
                    </button>
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

            {isShowDetail && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg w-full max-w-md"> {/* Adjust width and padding */}
                        <button
                            onClick={() => setIsShowDetail(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl p-2"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">User Details</h2>
                        <p className="mb-2">ID: {selectedUser.id}</p>
                        <p className="mb-2">Name: {selectedUser.name}</p>
                        <p className="mb-2">Age: {selectedUser.age}</p>
                        <p className="mb-4">Phone: {selectedUser.phone}</p>
                        <div className="flex space-x-4"> {/* Add space between buttons */}
                            <button
                                onClick={() => setIsShowDetail(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={handleUpdateUser}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <UpdateUserModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onSubmit={handleUpdateUserSubmit}
                user={{ id: selectedUser.id, name, age, phone }}
                setUser={(user) => {
                    setSelectedUser(user);
                    setName(user.name);
                    setAge(user.age);
                    setPhone(user.phone);
                }}
            />

            <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateUserSubmit}
                user={{ id: 0, name, age, phone }}
                setUser={(user) => {
                    setName(user.name);
                    setAge(user.age);
                    setPhone(user.phone);
                }}
            />
        </div>
    );
};

export default UserList;
