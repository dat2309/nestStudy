import axios from 'axios';

// Create an instance of Axios with default configuration
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Base URL for your API
    timeout: 10000, // Request timeout
    headers: {
        'Content-Type': 'application/json',
        // Add other headers if needed
    },
});

export default axiosInstance;
