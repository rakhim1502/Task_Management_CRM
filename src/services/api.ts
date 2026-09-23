/**
 * API Service - Axios Instance Configuration
 * 
 * Configures Axios with:
 * - Base URL
 * - Request interceptors (JWT token)
 * - Response interceptors (error handling)
 * - Token refresh logic
 */
import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// ============================================
// REQUEST INTERCEPTOR
// ============================================
// Add JWT token to all requests
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// RESPONSE INTERCEPTOR
// ============================================
// Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized (token expired or invalid)
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // Handle 403 Forbidden (insufficient permissions)
    if (error.response?.status === 403) {
      console.error('Access denied:', error.response.data?.message);
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error: Please check your connection');
    }

    return Promise.reject(error);
  }
);

// ============================================
// API HELPER FUNCTIONS
// ============================================

/**
 * Set authentication token
 */
export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

/**
 * Remove authentication token
 */
export const removeAuthToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete api.defaults.headers.common['Authorization'];
};

/**
 * Get current token
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export default api;
