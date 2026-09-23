/**
 * Task Service
 * 
 * API calls for task operations
 */
import api from './api';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  assignedTo?: number;
  createdBy: number;
  assignee?: {
    id: number;
    name: string;
    email: string;
  };
  creator: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  status?: string;
  priority?: string;
  assignedTo?: number;
  createdBy?: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface TaskResponse {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Get tasks with filters
 */
export const getTasks = async (filters?: TaskFilters): Promise<TaskResponse> => {
  const params = new URLSearchParams();
  
  if (filters) {
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.assignedTo) params.append('assignedTo', filters.assignedTo.toString());
    if (filters.createdBy) params.append('createdBy', filters.createdBy.toString());
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
  }

  const response = await api.get<{ success: boolean; data: { tasks: Task[]; pagination: any } }>(
    `/tasks?${params.toString()}`
  );
  
  return {
    tasks: response.data.data.tasks,
    pagination: response.data.data.pagination
  };
};

/**
 * Get task by ID
 */
export const getTask = async (id: number): Promise<Task> => {
  const response = await api.get<{ success: boolean; data: { task: Task } }>(`/tasks/${id}`);
  return response.data.data.task;
};

/**
 * Create new task
 */
export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await api.post<{ success: boolean; data: { task: Task } }>('/tasks', task);
  return response.data.data.task;
};

/**
 * Update task
 */
export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  const response = await api.put<{ success: boolean; data: { task: Task } }>(`/tasks/${id}`, task);
  return response.data.data.task;
};

/**
 * Delete task
 */
export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
