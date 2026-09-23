/**
 * Authentication Service
 * 
 * API calls for authentication operations
 */
import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: {
      id: number;
      name: string;
      email: string;
      role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
      createdAt?: string;
    };
    token: string;
  };
}

/**
 * Login user
 */
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  return response.data;
};

/**
 * Register new user
 */
export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', { name, email, password });
  return response.data;
};

/**
 * Get current user
 */
export const getMe = async (): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>('/auth/me');
  return response.data;
};

/**
 * Logout user (clear local storage)
 */
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('rememberMe');
};
