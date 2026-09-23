/**
 * Dashboard Page
 * 
 * Main dashboard with statistics, charts, and recent tasks
 */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getDashboardStats, DashboardStats } from '../services/dashboardService';
import StatCard from '../components/dashboard/StatCard';
import TaskChart from '../components/dashboard/TaskChart';
import RecentTasks from '../components/dashboard/RecentTasks';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back, {user?.name}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          value={stats.overview.totalUsers}
          label="Total Users"
          color="blue"
        />

        <StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          }
          value={stats.overview.totalTasks}
          label="Total Tasks"
          color="green"
        />

        <StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          value={`${stats.overview.completionRate}%`}
          label="Completion Rate"
          color="purple"
        />

        <StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          value={stats.overview.overdueTasks}
          label="Overdue Tasks"
          color="orange"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <TaskChart
          title="Tasks by Status"
          labels={['TODO', 'IN_PROGRESS', 'COMPLETED']}
          values={[stats.byStatus.todo, stats.byStatus.inProgress, stats.byStatus.completed]}
          colors={['bg-slate-400', 'bg-blue-500', 'bg-green-500']}
        />

        <TaskChart
          title="Tasks by Priority"
          labels={['HIGH', 'MEDIUM', 'LOW']}
          values={[stats.byPriority.high, stats.byPriority.medium, stats.byPriority.low]}
          colors={['bg-red-500', 'bg-yellow-500', 'bg-green-500']}
        />
      </div>

      {/* This Month Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">This Month</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Tasks Created</span>
              <span className="text-2xl font-bold text-white">{stats.thisMonth.created}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Tasks Completed</span>
              <span className="text-2xl font-bold text-white">{stats.thisMonth.completed}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Tasks per Employee</span>
              <span className="text-2xl font-bold text-white">{stats.overview.tasksPerEmployee}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Total Employees</span>
              <span className="text-2xl font-bold text-white">{stats.overview.totalEmployees}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <RecentTasks tasks={stats.recentTasks} />
    </div>
  );
};

export default DashboardPage;
