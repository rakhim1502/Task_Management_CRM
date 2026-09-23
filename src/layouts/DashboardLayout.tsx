/**
 * Dashboard Layout Component
 * 
 * Main layout for authenticated pages.
 * Includes Sidebar, Header, and main content area.
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
