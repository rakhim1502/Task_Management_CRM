/**
 * Profile Page
 * 
 * User profile view and edit page.
 */
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-slate-400">View and manage your account</p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
            <p className="text-slate-400">{user?.email}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
              user?.role === 'ADMIN' ? 'bg-red-500/20 text-red-400' :
              user?.role === 'MANAGER' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-green-500/20 text-green-400'
            }`}>
              {user?.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-slate-400 mb-1">Full Name</p>
            <p className="text-white font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Email Address</p>
            <p className="text-white font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Role</p>
            <p className="text-white font-medium">{user?.role}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Account Created</p>
            <p className="text-white font-medium">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
