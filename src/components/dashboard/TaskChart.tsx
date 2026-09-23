/**
 * TaskChart Component
 * 
 * Displays a bar chart for task statistics
 */
import React from 'react';

interface TaskChartProps {
  title: string;
  labels: string[];
  values: number[];
  colors: string[];
}

const TaskChart: React.FC<TaskChartProps> = ({ title, labels, values, colors }) => {
  const maxValue = Math.max(...values, 1);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      
      <div className="space-y-4">
        {labels.map((label, index) => {
          const value = values[index] || 0;
          const percentage = (value / maxValue) * 100;
          const color = colors[index] || 'bg-blue-500';

          return (
            <div key={label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-300">{label}</span>
                <span className="text-sm text-slate-400">{value}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className={`${color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskChart;
