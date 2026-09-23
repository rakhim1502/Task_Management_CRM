/**
 * Dashboard Service
 * 
 * API calls for dashboard operations
 */
import api from './api';

export interface DashboardStats {
  overview: {
    totalUsers: number;
    totalEmployees: number;
    totalTasks: number;
    completionRate: number;
    tasksPerEmployee: number;
    overdueTasks: number;
  };
  byStatus: {
    todo: number;
    inProgress: number;
    completed: number;
  };
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
  thisMonth: {
    created: number;
    completed: number;
  };
  recentTasks: any[];
  tasksByEmployee: any[];
}

export interface ChartData {
  statusChart: {
    labels: string[];
    values: number[];
  };
  priorityChart: {
    labels: string[];
    values: number[];
  };
}

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get<{ success: boolean; data: { stats: DashboardStats } }>('/dashboard');
  return response.data.data.stats;
};

/**
 * Get chart data
 */
export const getChartData = async (): Promise<ChartData> => {
  const response = await api.get<{ success: boolean; data: { chartData: ChartData } }>('/dashboard/charts');
  return response.data.data.chartData;
};
