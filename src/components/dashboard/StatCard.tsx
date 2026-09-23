/**
 * StatCard Component
 * 
 * Displays a single statistic card with icon, value, and label
 */
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color, trend }) => {
  const colorClasses = {
    blue: {
      bg: 'from-blue-600/20 to-blue-700/20',
      border: 'border-blue-500/30',
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-400',
    },
    green: {
      bg: 'from-green-600/20 to-green-700/20',
      border: 'border-green-500/30',
      iconBg: 'bg-green-600/20',
      iconColor: 'text-green-400',
    },
    purple: {
      bg: 'from-purple-600/20 to-purple-700/20',
      border: 'border-purple-500/30',
      iconBg: 'bg-purple-600/20',
      iconColor: 'text-purple-400',
    },
    orange: {
      bg: 'from-orange-600/20 to-orange-700/20',
      border: 'border-orange-500/30',
      iconBg: 'bg-orange-600/20',
      iconColor: 'text-orange-400',
    },
    red: {
      bg: 'from-red-600/20 to-red-700/20',
      border: 'border-red-500/30',
      iconBg: 'bg-red-600/20',
      iconColor: 'text-red-400',
    },
    yellow: {
      bg: 'from-yellow-600/20 to-yellow-700/20',
      border: 'border-yellow-500/30',
      iconBg: 'bg-yellow-600/20',
      iconColor: 'text-yellow-400',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className={`bg-gradient-to-br ${colors.bg} rounded-xl p-6 border ${colors.border}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center`}>
          <div className={colors.iconColor}>{icon}</div>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            trend.isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend.isPositive ? (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            )}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
};

export default StatCard;
