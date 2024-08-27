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
export const createUser = async (name: string, age: number, phone: string): Promise<User> => {
    try {
        const response = await axiosInstance.post('/user', { name, age, phone });
        return response.data.data; // Adjust based on the response structure from your API
    } catch (error) {
        console.error('Failed to create user', error);
        throw error; // Ensure errors are thrown so they can be handled in the component
    }
};