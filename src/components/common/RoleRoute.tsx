/**
 * Role-Based Route Component
 * 
 * Wraps routes that require specific roles.
 * Redirects to dashboard if user doesn't have required role.
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: ('ADMIN' | 'MANAGER' | 'EMPLOYEE')[];
}

const RoleRoute: React.FC<RoleRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user has required role
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render children if user has required role
  return <>{children}</>;
};

export default RoleRoute;
