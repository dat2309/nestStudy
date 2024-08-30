import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { isSuccess } from '../api/BaseResponse';
import { createUser, genarateAvatar, getUserDetails, getUsers, removeUser, updateAvatar, updateUser } from '../api/UserApi';
import CreateUserModal from '../components/CreateUserModal';
import UpdateUserModal from '../components/UpdateUserModal';
import { User } from '../model/User';
import { useDebounceInput } from '../utils/AppUtils';

const UserListPage: React.FC = () => {
    const [listUser, setListUser] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>(new User());
    const [sortBy, setSortBy] = useState<string>('-1');
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState<number | 0>(0);
    const [phone, setPhone] = useState('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<User>(new User()); // User role

    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setAvatarFile(file);
    };

    const debouncedSearch = useDebounceInput(searchQuery, 500);
    const handleTextChange = useCallback((text: string) => {
        setSearchQuery(text);
    }, []);
    const fetchUsers = async () => {
        try {
            const response = await getUsers(searchQuery, sortBy)
            if (isSuccess(response))
                setListUser(response.data);
            else {
                setListUser([])
                toast.error(response.message)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                // Extract error message from AxiosError
                const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
                toast(errorMessage);
            } else if (error instanceof Error) {
                // Handle other types of errors
                toast.error(error.message);
            } else {
                // Fallback for unknown error types
                toast.error('An unknown error occurred');
            }
            console.error('Failed to fetch users', error);
        }
    };
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || '{}');
        setCurrentUser(storedUser || new User());
    }, []);
    useEffect(() => {
        fetchUsers()

    }, [sortBy, debouncedSearch]);

    const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value);
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
                setListUser(listUser.filter(user => user.id !== id));
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
    const handleAvatarUpload = async (id: number) => {
        console.log(avatarFile)
        if (!avatarFile) return;
        if (id === 0) return;
        try {
            const responseGenarate = await genarateAvatar(avatarFile);
            console.log(responseGenarate.data.url)
            const response = await updateAvatar(id, responseGenarate.data.url ? responseGenarate.data.url : '');
            if (isSuccess(response)) {
                if (id === currentUser.id) {
                    localStorage.setItem("user", JSON.stringify({ ...currentUser, avatar: response.data.avatar }));
                    setCurrentUser((prevUser) => ({
                        ...prevUser,
                        avatar: response.data.avatar
                    }));

                }

                setSelectedUser((prevUser) => ({
                    ...prevUser,
                    avatar: response.data.avatar
                }));

            }
            else {
                toast.error(response.message)
            }

            // Optionally, refresh user data here
        } catch (error) {
            console.error('Failed to upload avatar:', error);
            // Handle the error, e.g., show a toast notification
        }
    };
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleImageClick = (src: string) => {
        setImageSrc(src);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setImageSrc(null);
    };
    return (
        <div className="p-10">
            <div className="flex items-center mb-4">
                {currentUser.avatar && (
                    <img
                        src={`${process.env.REACT_APP_API_URL_MEDIA}${currentUser.avatar}`} // Assuming avatar is base64 encoded
                        alt="Current User Avatar"
                        className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer"
                        onClick={() => handleImageClick(`${process.env.REACT_APP_API_URL_MEDIA}${currentUser.avatar}`)}
                    />
                )}
                <div className="ml-4">
                    <p className="text-lg font-semibold">{currentUser.name}</p>
                </div>
                <button
                    onClick={() => {
                        localStorage.clear()
                        window.location.href = '/'
                    }}
                    className="btn bg-gray-300 hover:bg-gray-600 text-white rounded p-2 ml-auto"
                >
                    Logout
                </button>
            </div>


            <h1 className="text-2xl">User List</h1>



            <div className="my-4 flex space-x-4">
                <div className="flex-grow">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => handleTextChange(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div className="flex-grow">
                    <label htmlFor="sort" className="mr-2">Sort By:</label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={handleSort}
                        className="border rounded p-2"
                    >
                        <option value="-1">Default</option>
                        <option value="0">ID</option>
                        <option value="1">Name</option>
                        <option value="2">Age</option>
                        <option value="3">Phone</option>
                    </select>
                </div>
                {
                    currentUser.role === 'manager' &&
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="btn bg-green-500 hover:bg-green-600 text-white rounded p-2"
                    >
                        Create User
                    </button>
                }

            </div>
            <ul>
                {listUser.map(user => (
                    <li key={user.id} className="mb-2 p-2 border rounded">
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Age: {user.age}</p>
                        <p>Phone: {user.phone}</p>
                        <button onClick={() => handleViewDetails(user.id ?? 0)} className="btn bg-blue-500 hover:bg-blue-600 rounded p-1 mr-4">See Details</button>
                        {
                            currentUser.role === 'manager' &&
                            <button onClick={() => handleRemove(user.id ?? 0)} className="btn bg-red-500 hover:bg-red-600 rounded p-1">Remove</button>
                        }
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
                        {selectedUser.avatar && (
                            <div className="flex justify-center mb-4">
                                <img
                                    src={`${process.env.REACT_APP_API_URL_MEDIA}${selectedUser.avatar}`}
                                    alt="User Avatar"
                                    style={{ width: '100px', height: '100px' }}
                                    className="rounded-full cursor-pointer"
                                    onClick={() => handleImageClick(`${process.env.REACT_APP_API_URL_MEDIA}${selectedUser.avatar}`)}
                                />
                            </div>
                        )}
                        <p className="mb-2">ID: {selectedUser.id}</p>
                        <p className="mb-2">Name: {selectedUser.name}</p>
                        <p className="mb-2">Age: {selectedUser.age}</p>
                        <p className="mb-4">Phone: {selectedUser.phone}</p>
                        {
                            (currentUser.id === selectedUser.id || currentUser.role === 'manager') &&
                            <div className="mb-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="border rounded p-2 mb-2 w-full"
                                />
                                <button
                                    onClick={() => handleAvatarUpload(selectedUser.id ?? 0)}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                >
                                    Update Avatar
                                </button>
                            </div>}
                        <div className="flex items-center justify-between space-x-4"> {/* Add space between buttons */}
                            {
                                (currentUser.id === selectedUser.id || currentUser.role === 'manager') &&
                                <button
                                    onClick={handleUpdateUser}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Update
                                </button>
                            }
                            <button
                                onClick={() => setIsShowDetail(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                Close
                            </button>


                        </div>
                    </div>
                </div>
            )}
            {isImageModalOpen && imageSrc && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative bg-white p-4 rounded">
                        <button
                            onClick={closeImageModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl p-2"
                        >
                            &times;
                        </button>
                        <img
                            src={`${imageSrc}`}

                            alt="Full Screen"
                            style={{ maxWidth: '90vw', maxHeight: '90vh' }}
                            className="rounded"
                        />
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

export default UserListPage;
