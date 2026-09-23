/**
 * Task List Component
 * 
 * Displays a list of tasks with filtering, search, and pagination
 * Uses demo data for frontend demonstration
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Demo tasks
const demoTasks = [
  {
    id: 1,
    title: 'Website Redesign',
    description: 'Redesign the company website with modern UI/UX principles',
    status: 'TODO' as const,
    priority: 'HIGH' as const,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: { id: 3, name: 'John Developer', email: 'employee1@crm.com' },
    creator: { id: 1, name: 'Admin User', email: 'admin@crm.com' },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'API Integration',
    description: 'Integrate third-party payment API',
    status: 'IN_PROGRESS' as const,
    priority: 'HIGH' as const,
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: { id: 4, name: 'Emma Designer', email: 'employee2@crm.com' },
    creator: { id: 2, name: 'Sarah Manager', email: 'manager@crm.com' },
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Database Optimization',
    description: 'Optimize slow database queries',
    status: 'COMPLETED' as const,
    priority: 'MEDIUM' as const,
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: { id: 5, name: 'Mike Analyst', email: 'employee3@crm.com' },
    creator: { id: 1, name: 'Admin User', email: 'admin@crm.com' },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    title: 'Write Documentation',
    description: 'Write API documentation for developers',
    status: 'TODO' as const,
    priority: 'LOW' as const,
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: { id: 3, name: 'John Developer', email: 'employee1@crm.com' },
    creator: { id: 2, name: 'Sarah Manager', email: 'manager@crm.com' },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    title: 'Bug Fixes',
    description: 'Fix reported bugs in production',
    status: 'IN_PROGRESS' as const,
    priority: 'HIGH' as const,
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    assignee: { id: 4, name: 'Emma Designer', email: 'employee2@crm.com' },
    creator: { id: 1, name: 'Admin User', email: 'admin@crm.com' },
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const TaskList: React.FC = () => {
  const { user } = useAuth();
  const [tasks] = useState(demoTasks);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = 
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(search.toLowerCase()));
    
    const matchesStatus = !statusFilter || task.status === statusFilter;
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Get status badge color
  const getStatusBadge = (status: string) => {
    const colors = {
      TODO: 'bg-slate-500/20 text-slate-400',
      IN_PROGRESS: 'bg-blue-500/20 text-blue-400',
      COMPLETED: 'bg-green-500/20 text-green-400'
    };
    return colors[status as keyof typeof colors] || 'bg-slate-500/20 text-slate-400';
  };

  // Get priority badge color
  const getPriorityBadge = (priority: string) => {
    const colors = {
      HIGH: 'bg-red-500/20 text-red-400',
      MEDIUM: 'bg-yellow-500/20 text-yellow-400',
      LOW: 'bg-green-500/20 text-green-400'
    };
    return colors[priority as keyof typeof colors] || 'bg-slate-500/20 text-slate-400';
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Tasks</h1>
          <p className="text-slate-400">Manage and track all tasks</p>
        </div>
        {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
          <Link
            to="/tasks/create"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Task
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Priority</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 text-center">
          <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-slate-400 text-lg">No tasks found</p>
          <p className="text-slate-500 text-sm mt-2">Try adjusting your filters or create a new task</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Link
              key={task.id}
              to={`/tasks/${task.id}`}
              className="block bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-2 truncate">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                    {task.assignee && (
                      <span className="text-xs text-slate-500">
                        Assigned to: {task.assignee.name}
                      </span>
                    )}
                    {task.dueDate && (
                      <span className="text-xs text-slate-500">
                        Due: {formatDate(task.dueDate)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-2xl font-bold text-white">{tasks.length}</p>
            <p className="text-sm text-slate-400">Total Tasks</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-400">
              {tasks.filter(t => t.status === 'TODO').length}
            </p>
            <p className="text-sm text-slate-400">TODO</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">
              {tasks.filter(t => t.status === 'IN_PROGRESS').length}
            </p>
            <p className="text-sm text-slate-400">In Progress</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">
              {tasks.filter(t => t.status === 'COMPLETED').length}
            </p>
            <p className="text-sm text-slate-400">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
