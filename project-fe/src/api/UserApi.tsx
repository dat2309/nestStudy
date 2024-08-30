import forge from 'node-forge';
import { Avatar, User } from "../model/User";
import axiosInstance from "./AxiosInstance";
import { BaseResponse } from "./BaseResponse";



// Other functions like createUser, updateUser, removeUser can be similarly implemented

export const getUsers = async (searchQuery?: string, sortBy?: string): Promise<BaseResponse<User[]>> => {
    try {
        const response = await axiosInstance.get('/user', {

            headers: {
                Authorization: localStorage.getItem('token')
            },
            params: {
                key_search: searchQuery,
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
        const response = await axiosInstance.post('/user', user, {
            headers: {
                Authorization: localStorage.getItem('token') || '',
            },
        });
        return response.data;
        // Adjust based on the response structure from your API
    } catch (error) {
        console.error('Failed to create user', error);
        throw error; // Ensure errors are thrown so they can be handled in the component
    }
};
export const updateUser = async (id: number, user: User): Promise<BaseResponse<User>> => {
    try {
        const response = await axiosInstance.post(`/user/${id}/update`, user, {
            headers: {
                Authorization: localStorage.getItem('token') || '',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update user', error);
        throw error;
    }
};
export const getUserDetails = async (id: number): Promise<BaseResponse<User>> => {
    try {
        const response = await axiosInstance.get(`/user/${id}/detail`, {
            headers: {
                Authorization: localStorage.getItem('token') || '',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user details', error);
        throw error;
    }
};
// Function to remove a user by ID
export const removeUser = async (id: number): Promise<BaseResponse<any>> => {
    try {
        const response = await axiosInstance.post('/user/remove', { id }, {
            headers: {
                Authorization: localStorage.getItem('token') || '',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to remove user', error);
        throw error;
    }
};
const fetchPublicKey = async () => {
    try {
        const response = await axiosInstance.get('/rsa/plk');
        return response.data; // Base64-encoded public key
    } catch (error) {
        console.error('Failed to fetch public key', error);
        throw error;
    }
};
const encryptPayload = (publicKeyBase64: string, payloadString: string) => {
    const publicKeyPem = forge.util.decode64(publicKeyBase64); // Convert Base64 to PEM
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);// Convert payload to a string
    const encryptedPayload = publicKey.encrypt(payloadString, 'RSA-OAEP', {
        md: forge.md.sha256.create(), // Use SHA-256 as the hashing algorithm
    });
    return forge.util.encode64(encryptedPayload); // Return Base64-encoded encrypted payload
};
export const login = async (accountName: string, password: string): Promise<BaseResponse<any>> => {
    try {

        const publicKeyBase64 = await fetchPublicKey();
        const payload = { password: password };
        const encryptedPayload = encryptPayload(publicKeyBase64, JSON.stringify(payload));
        const response = await axiosInstance.post('/login', {
            account_name: accountName,
            password: encryptedPayload,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to remove user', error);
        throw error;
    }
};
export const genarateAvatar = async (file: File): Promise<BaseResponse<Avatar>> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData.get('file'))
        const response = await axiosInstance.post(`/media/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: localStorage.getItem('token') || '',
                ProjectId: '2'
            },
        });

        return response.data; // Adjust based on the response structure from your API
    } catch (error) {
        console.error('Failed to upload avatar', error);
        throw error; // Ensure errors are thrown so they can be handled in the component
    }
};

export const updateAvatar = async (userId: number, avatar: String): Promise<BaseResponse<User>> => {
    try {

        const response = await axiosInstance.post(`/user/${userId}/upload-avatar`, {
            avatar: avatar
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: localStorage.getItem('token') || '',
                ProjectId: '1'
            },
        });

        return response.data; // Adjust based on the response structure from your API
    } catch (error) {
        console.error('Failed to upload avatar', error);
        throw error; // Ensure errors are thrown so they can be handled in the component
    }
};

