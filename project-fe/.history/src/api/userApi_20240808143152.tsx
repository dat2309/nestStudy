import axiosInstance from './services/axiosInstance'; // Adjust the path as needed

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get('/user');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Other functions like createUser, updateUser, removeUser can be similarly implemented
