import axios from 'axios';

// Create an instance of Axios with default configuration
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000', // Base URL for your API
    timeout: 10000, // Request timeout
    headers: {
        'Content-Type': 'application/json',
    A
        // Add other headers if needed
    },
});
axiosInstance.interceptors.request.use(
    (config) => {
      if (config.headers.ProjectId) {
        config.headers.ProjectId = config.headers.ProjectId;
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
