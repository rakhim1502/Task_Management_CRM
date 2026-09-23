/**
 * Dashboard Page
 * 
 * Main dashboard with statistics overview
 * Uses demo data for frontend demonstration
 */
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import StatCard from '../components/dashboard/StatCard';
import TaskChart from '../components/dashboard/TaskChart';
import RecentTasks from '../components/dashboard/RecentTasks';

// Demo data for frontend demonstration
const demoStats = {
  overview: {
    totalUsers: 5,
    totalEmployees: 3,
    totalTasks: 10,
    completionRate: 30,
    tasksPerEmployee: 3,
    overdueTasks: 2
  },
  byStatus: {
    todo: 4,
    inProgress: 3,
    completed: 3
  },
  byPriority: {
    high: 3,
    medium: 4,
    low: 3
  },
  thisMonth: {
    created: 5,
    completed: 2
  },
  recentTasks: [
    {
      id: 1,
      title: 'Website Redesign',
      status: 'TODO' as const,
      priority: 'HIGH' as const,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      assignee: { id: 3, name: 'John Developer' }
    },
    {
      id: 2,
      title: 'API Integration',
      status: 'IN_PROGRESS' as const,
      priority: 'HIGH' as const,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      assignee: { id: 4, name: 'Emma Designer' }
    },
    {
      id: 3,
      title: 'Database Optimization',
      status: 'COMPLETED' as const,
      priority: 'MEDIUM' as const,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      assignee: { id: 5, name: 'Mike Analyst' }
    },
    {
      id: 4,
      title: 'Write Documentation',
      status: 'TODO' as const,
      priority: 'LOW' as const,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      assignee: { id: 3, name: 'John Developer' }
    },
    {
      id: 5,
      title: 'Bug Fixes',
      status: 'IN_PROGRESS' as const,
      priority: 'HIGH' as const,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      assignee: { id: 4, name: 'Emma Designer' }
    }
  ],
  tasksByEmployee: []
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const stats = demoStats;

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
