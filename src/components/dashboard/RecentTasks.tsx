/**
 * RecentTasks Component
 * 
 * Displays a list of recent tasks
 */
import React from 'react';
import { Link } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  assignee?: {
    id: number;
    name: string;
  };
}

interface RecentTasksProps {
  tasks: Task[];
}

const RecentTasks: React.FC<RecentTasksProps> = ({ tasks }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO':
        return 'bg-slate-500/20 text-slate-400';
      case 'IN_PROGRESS':
        return 'bg-blue-500/20 text-blue-400';
      case 'COMPLETED':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-500/20 text-red-400';
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'LOW':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Tasks</h3>
        <Link to="/tasks" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          View all →
        </Link>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-slate-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-slate-500">No tasks yet</p>
          </div>
        ) : (
          tasks.map((task) => (
            <Link
              key={task.id}
              to={`/tasks/${task.id}`}
              className="block p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate mb-2">
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    {task.assignee && (
                      <span className="text-xs text-slate-500">
                        → {task.assignee.name}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-slate-500 whitespace-nowrap">
                  {formatDate(task.createdAt)}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentTasks;
