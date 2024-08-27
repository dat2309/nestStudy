import axiosInstance from "./AxiosInstance";


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

export const fetchUsers = async (sortBy?: string): Promise<User[]> => {
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