import axios from 'axios';

// Create an instance of Axios with default configuration
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Base URL for your API
    timeout: 10000, // Request timeout
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50TmFtZSI6IkpvaG4gRG9lIiwic3ViIjoxLCJ1c2VySWQiOjEsImlhdCI6MTcyMzE3MTI5NiwiZXhwIjoxNzIzMTc0ODk2fQ.hK_PM8NLecl61kXBnzgM3lk1k6v6sSbAgHcH8EYWhYs'
        // Add other headers if needed
    },
});
axiosInstance.interceptors.request.use(
    (config) => {

        if (config.headers.Authorization) {
            config.headers.Authorization = config.headers.Authorization;
        }
        if (config.headers.Authorization) {
            config.headers.Authorization = config.headers.Authorization;
        }
        return config;
    },
    function error() {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response;
    },
    (error) => {
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);
export default axiosInstance;
