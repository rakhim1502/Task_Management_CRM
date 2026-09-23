/**
 * User List Component
 * 
 * Displays a list of users with search and role filter
 * Uses demo data for frontend demonstration
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Demo users
const demoUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@crm.com',
    role: 'ADMIN' as const,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Sarah Manager',
    email: 'manager@crm.com',
    role: 'MANAGER' as const,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'John Developer',
    email: 'employee1@crm.com',
    role: 'EMPLOYEE' as const,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    name: 'Emma Designer',
    email: 'employee2@crm.com',
    role: 'EMPLOYEE' as const,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    name: 'Mike Analyst',
    email: 'employee3@crm.com',
    role: 'EMPLOYEE' as const,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const UserList: React.FC = () => {
  const { user } = useAuth();
  const [users] = useState(demoUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesRole = !roleFilter || u.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Get role badge color
  const getRoleBadge = (role: string) => {
    const colors = {
      ADMIN: 'bg-red-500/20 text-red-400',
      MANAGER: 'bg-yellow-500/20 text-yellow-400',
      EMPLOYEE: 'bg-green-500/20 text-green-400'
    };
    return colors[role as keyof typeof colors] || 'bg-slate-500/20 text-slate-400';
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Employees</h1>
          <p className="text-slate-400">Manage all users and their roles</p>
        </div>
        {user?.role === 'ADMIN' && (
          <Link
            to="/users/create"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Roles</option>
            <option value="ADMIN">ADMIN</option>
            <option value="MANAGER">MANAGER</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
          </select>
        </div>
      </div>

      {/* User List */}
      {filteredUsers.length === 0 ? (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 text-center">
          <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-slate-400 text-lg">No users found</p>
          <p className="text-slate-500 text-sm mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((u) => (
            <Link
              key={u.id}
              to={`/users/${u.id}`}
              className="block bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {u.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate mb-1">
                    {u.name}
                  </h3>
                  <p className="text-sm text-slate-400 truncate mb-2">
                    {u.email}
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(u.role)}`}>
                    {u.role}
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
            <p className="text-2xl font-bold text-white">{users.length}</p>
            <p className="text-sm text-slate-400">Total Users</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-400">
              {users.filter(u => u.role === 'ADMIN').length}
            </p>
            <p className="text-sm text-slate-400">Admins</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-400">
              {users.filter(u => u.role === 'MANAGER').length}
            </p>
            <p className="text-sm text-slate-400">Managers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">
              {users.filter(u => u.role === 'EMPLOYEE').length}
            </p>
            <p className="text-sm text-slate-400">Employees</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
