import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your backend's API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add the Authorization token (if available)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
