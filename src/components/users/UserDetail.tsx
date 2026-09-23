/**
 * User Detail Component
 * 
 * Displays detailed information about a user
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUser, deleteUser, User } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getUser(parseInt(id));
        setUser(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Handle delete
  const handleDelete = async () => {
    if (!user) return;

    try {
      await deleteUser(user.id);
      navigate('/users');
    } catch (err: any) {
      setError(err.message || 'Failed to delete user');
    }
  };

  // Get role badge color
  const getRoleBadge = (role: string) => {
    const colors = {
      ADMIN: 'bg-red-500/20 text-red-400',
      MANAGER: 'bg-yellow-500/20 text-yellow-400',
      EMPLOYEE: 'bg-green-500/20 text-green-400'
    };
    return colors[role as keyof typeof colors] || 'bg-slate-500/20 text-slate-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-slate-400">Loading user...</p>
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

  if (!user) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 text-center">
        <p className="text-slate-400 text-lg">User not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/users" className="text-sm text-blue-400 hover:text-blue-300 mb-2 inline-block">
            ← Back to Users
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
            {user.role}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {currentUser?.role === 'ADMIN' && (
            <>
              <Link
                to={`/users/${user.id}/edit`}
                className="bg-slate-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-600 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Link>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg font-medium hover:bg-red-600/30 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                <p className="text-slate-400 mb-2">{user.email}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role)}`}>
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-semibold text-white mb-4">User Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">Full Name</p>
                <p className="text-white font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Email Address</p>
                <p className="text-white font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Role</p>
                <p className="text-white font-medium">{user.role}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Account Created</p>
                <p className="text-white font-medium">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-400 mb-1">Last Updated</p>
                <p className="text-white font-medium">
                  {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to={`/users/${user.id}/edit`}
                className="block w-full bg-slate-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-600 transition-colors text-center"
              >
                Edit User
              </Link>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="block w-full bg-red-600/20 text-red-400 px-4 py-2 rounded-lg font-medium hover:bg-red-600/30 transition-colors"
              >
                Delete User
              </button>
            </div>
          </div>

          {/* Role Permissions */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-semibold text-white mb-4">Role Permissions</h2>
            <div className="space-y-2 text-sm text-slate-300">
              {user.role === 'ADMIN' && (
                <>
                  <p>✓ Full system access</p>
                  <p>✓ Manage all users</p>
                  <p>✓ Manage all tasks</p>
                  <p>✓ View dashboard</p>
                </>
              )}
              {user.role === 'MANAGER' && (
                <>
                  <p>✓ View all employees</p>
                  <p>✓ Create and edit tasks</p>
                  <p>✓ Assign tasks</p>
                  <p>✓ View dashboard</p>
                </>
              )}
              {user.role === 'EMPLOYEE' && (
                <>
                  <p>✓ View assigned tasks</p>
                  <p>✓ Update task status</p>
                  <p>✓ View own profile</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Delete User</h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete <strong>{user.name}</strong>? This action cannot be undone.
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

export default UserDetail;
