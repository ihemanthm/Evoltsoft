import axios from 'axios';
import { useToast } from 'vue-toastification';
import { getAuthToken, clearAuthData } from './auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Important for sending cookies with requests
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const toast = useToast();
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data?.message || 'An error occurred';
      
      // Don't show error for 401 when trying to access login page
      if (!(error.response.status === 401 && window.location.pathname === '/login')) {
        toast.error(message);
      }
      
      // If unauthorized, clear auth data and redirect to login
      if (error.response.status === 401) {
        clearAuthData();
        
        // Only redirect if not already on login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error('An error occurred: ' + error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
