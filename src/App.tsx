/**
 * App Component - Main Application Entry Point
 * 
 * Configures React Router with:
 * - Public routes (login, register)
 * - Protected routes (dashboard, tasks, users, profile)
 * - Role-based routes
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import RoleRoute from './components/common/RoleRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard - All authenticated users */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Tasks - All authenticated users */}
            <Route path="/tasks" element={<div className="text-white">Tasks Page (Coming in Step 13)</div>} />
            <Route path="/tasks/create" element={<div className="text-white">Create Task Page (Coming in Step 13)</div>} />
            <Route path="/tasks/:id" element={<div className="text-white">Task Detail Page (Coming in Step 13)</div>} />

            {/* Users - ADMIN and MANAGER only */}
            <Route
              path="/users"
              element={
                <RoleRoute allowedRoles={['ADMIN', 'MANAGER']}>
                  <div className="text-white">Users Page (Coming in Step 14)</div>
                </RoleRoute>
              }
            />
            <Route
              path="/users/:id"
              element={
                <RoleRoute allowedRoles={['ADMIN', 'MANAGER']}>
                  <div className="text-white">User Detail Page (Coming in Step 14)</div>
                </RoleRoute>
              }
            />

            {/* Profile - All authenticated users */}
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
