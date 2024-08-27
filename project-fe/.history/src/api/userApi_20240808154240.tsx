import { User } from "../model/User";
import axiosInstance from "./AxiosInstance";
import { BaseResponse } from "./BaseResponse";




// Other functions like createUser, updateUser, removeUser can be similarly implemented

export const getUsers = async (sortBy?: string): Promise<BaseResponse<User[]>> => {
    try {
        const response = await axiosInstance.get('/user', {
            params: {
                sort_by: sortBy,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch users', error);
        throw error; // Ensure errors are thrown so they can be handled in the component
    }
};
export const createUser = async (user: User): Promise<BaseResponse<User>> => {
    try {
        const response = await axiosInstance.post('/user', user);
        return response.data;
        // Adjust based on the response structure from your API
    } catch (error) {
        console.error('Failed to create user', error);
        throw error; // Ensure errors are thrown so they can be handled in the component
    }
};
export const updateUser = async (id: number, user: User): Promise<BaseResponse<User>> => {
    try {
        const response = await axiosInstance.post(`/user/${id}/update`, user);
        return response.data;
    } catch (error) {
        console.error('Failed to update user', error);
        throw error;
    }
};
export const getUserDetails = async (id: number): Promise<BaseResponse<User>> => {
    try {
        const response = await axiosInstance.get(`/user/${id}/detail`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user details', error);
        throw error;
    }
};
// Function to remove a user by ID
export const removeUser = async (id: number): Promise<void> => {
    try {
        await axiosInstance.post('/user/remove', { id });
    } catch (error) {
        console.error('Failed to remove user', error);
        throw error;
    }
};
