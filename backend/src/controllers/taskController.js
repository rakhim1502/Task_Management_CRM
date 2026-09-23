const taskService = require('../services/taskService');

const getTasks = async (req, res, next) => {
  try {
    const filters = {
      status: req.query.status,
      priority: req.query.priority,
      assignedTo: req.query.assignedTo ? parseInt(req.query.assignedTo) : undefined,
      createdBy: req.query.createdBy ? parseInt(req.query.createdBy) : undefined,
      search: req.query.search,
      page: req.query.page ? parseInt(req.query.page) : 1,
      limit: req.query.limit ? parseInt(req.query.limit) : 10,
    };

    // If employee, only show their own tasks
    if (req.user.role === 'EMPLOYEE') {
      filters.assignedTo = req.user.id;
    }

    const result = await taskService.getTasks(filters);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTask(parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    // Employee can only see their own tasks
    if (req.user.role === 'EMPLOYEE' && task.assignedTo !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json({ success: true, message: 'Task created', data: task });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(parseInt(req.params.id), req.body, req.user);
    res.json({ success: true, message: 'Task updated', data: task });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(parseInt(req.params.id));
    res.json({ success: true, message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
