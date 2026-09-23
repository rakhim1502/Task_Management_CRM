/**
 * Task Create Page
 * 
 * Page for creating a new task
 */
import React from 'react';
import TaskForm from '../components/tasks/TaskForm';

const TaskCreatePage: React.FC = () => {
  return <TaskForm mode="create" />;
};

export default TaskCreatePage;
