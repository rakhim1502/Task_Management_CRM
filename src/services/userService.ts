/**
 * User Service
 * 
 * API calls for user operations
 */
import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get all users
 */
export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<{ success: boolean; data: { users: User[] } }>('/users');
  return response.data.data.users;
};

/**
 * Get employees only
 */
export const getEmployees = async (): Promise<User[]> => {
  const users = await getUsers();
  return users.filter(user => user.role === 'EMPLOYEE');
};

/**
 * Get user by ID
 */
export const getUser = async (id: number): Promise<User> => {
  const response = await api.get<{ success: boolean; data: { user: User } }>(`/users/${id}`);
  return response.data.data.user;
};

/**
 * Create new user
 */
export const createUser = async (userData: User): Promise<User> => {
  const response = await api.post<{ success: boolean; data: { user: User } }>('/users', userData);
  return response.data.data.user;
};

/**
 * Update user
 */
export const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
  const response = await api.put<{ success: boolean; data: { user: User } }>(`/users/${id}`, userData);
  return response.data.data.user;
};

/**
 * Delete user
 */
export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
