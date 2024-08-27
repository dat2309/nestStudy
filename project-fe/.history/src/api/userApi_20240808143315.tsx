import { User } from "../model/User";
import axiosInstance from "./AxiosInstance";




// Other functions like createUser, updateUser, removeUser can be similarly implemented

export const getUsers = async (sortBy?: string): Promise<User[]> => {
    try {
        const response = await axiosInstance.get('/user', {
            params: {
                sort_by: sortBy,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch users', error);
        throw error; // Ensure errors are thrown so they can be handled in the component
    }
};