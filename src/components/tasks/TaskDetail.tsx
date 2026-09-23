/**
 * Task Detail Component
 * 
 * Displays detailed information about a task
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTask, updateTask, deleteTask, Task } from '../../services/taskService';
import { useAuth } from '../../hooks/useAuth';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch task
  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getTask(parseInt(id));
        setTask(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Handle status update
  const handleStatusUpdate = async (newStatus: Task['status']) => {
    if (!task) return;

    try {
      const updated = await updateTask(task.id, { status: newStatus });
      setTask(updated);
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!task) return;

    try {
      await deleteTask(task.id);
      navigate('/tasks');
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
    }
  };

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
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-slate-400">Loading task...</p>
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

  if (!task) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 text-center">
        <p className="text-slate-400 text-lg">Task not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/tasks" className="text-sm text-blue-400 hover:text-blue-300 mb-2 inline-block">
            ← Back to Tasks
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">{task.title}</h1>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(task.status)}`}>
              {task.status.replace('_', ' ')}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(task.priority)}`}>
              {task.priority} Priority
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {(user?.role === 'ADMIN' || user?.role === 'MANAGER' || 
            (user?.role === 'EMPLOYEE' && task.assignedTo === user.id)) && (
            <Link
              to={`/tasks/${task.id}/edit`}
              className="bg-slate-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-600 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>
          )}
          {user?.role === 'ADMIN' && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg font-medium hover:bg-red-600/30 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Task Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
            <p className="text-slate-300 whitespace-pre-wrap">
              {task.description || 'No description provided'}
            </p>
          </div>

          {/* Status Update (for employees) */}
          {user?.role === 'EMPLOYEE' && task.assignedTo === user.id && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-white mb-4">Update Status</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleStatusUpdate('TODO')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    task.status === 'TODO'
                      ? 'bg-slate-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  TODO
                </button>
                <button
                  onClick={() => handleStatusUpdate('IN_PROGRESS')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    task.status === 'IN_PROGRESS'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  IN_PROGRESS
                </button>
                <button
                  onClick={() => handleStatusUpdate('COMPLETED')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    task.status === 'COMPLETED'
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  COMPLETED
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-semibold text-white mb-4">Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">Assignee</p>
                <p className="text-white font-medium">
                  {task.assignee ? task.assignee.name : 'Unassigned'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Created By</p>
                <p className="text-white font-medium">{task.creator.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Due Date</p>
                <p className="text-white font-medium">{task.dueDate ? formatDate(task.dueDate) : 'No due date'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Created</p>
                <p className="text-white font-medium">
                  {new Date(task.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Last Updated</p>
                <p className="text-white font-medium">
                  {new Date(task.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Delete Task</h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
