/**
 * Authentication Context
 * 
 * Manages authentication state across the application:
 * - User login/logout
 * - Token management
 * - Current user data
 * - Authentication status
 */
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api, { setAuthToken, removeAuthToken } from '../services/api';

// ============================================
// TYPES
// ============================================

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// ============================================
// CONTEXT
// ============================================

export const AuthContext = createContext<AuthContextType | null>(null);

// ============================================
// PROVIDER
// ============================================

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ============================================
  // INITIALIZE AUTH STATE
  // ============================================
  
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          // Verify token is still valid
          setAuthToken(storedToken);
          const response = await api.get('/auth/me');
          
          if (response.data.success) {
            setUser(response.data.data.user);
            setToken(storedToken);
          } else {
            // Token invalid, clear storage
            removeAuthToken();
          }
        } catch (error) {
          // Token expired or invalid
          removeAuthToken();
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  // ============================================
  // LOGIN
  // ============================================
  
  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data.success) {
        const { user: userData, token: authToken } = response.data.data;

        // Save to state
        setUser(userData);
        setToken(authToken);

        // Save to localStorage
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));

        // Set token in API headers
        setAuthToken(authToken);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }
  };

  // ============================================
  // REGISTER
  // ============================================
  
  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });

      if (response.data.success) {
        const { user: userData, token: authToken } = response.data.data;

        // Save to state
        setUser(userData);
        setToken(authToken);

        // Save to localStorage
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(userData));

        // Set token in API headers
        setAuthToken(authToken);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      throw new Error(message);
    }
  };

  // ============================================
  // LOGOUT
  // ============================================
  
  const logout = () => {
    // Clear state
    setUser(null);
    setToken(null);

    // Clear localStorage
    removeAuthToken();

    // Redirect to login
    window.location.href = '/login';
  };

  // ============================================
  // CONTEXT VALUE
  // ============================================
  
  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
