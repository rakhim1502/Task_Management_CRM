/**
 * Task Controller
 * 
 * Handles HTTP requests for task operations with role-based access control:
 * - ADMIN: Full access to all tasks
 * - MANAGER: Can create, view, and update tasks (no delete)
 * - EMPLOYEE: Can view own tasks and update status only
 */
const taskService = require('../services/taskService');

/**
 * GET /api/tasks
 * Get all tasks with filters, search, pagination
 */
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

    // EMPLOYEE can only see tasks assigned to them
    if (req.user.role === 'EMPLOYEE') {
      filters.assignedTo = req.user.id;
    }

    const result = await taskService.getTasks(filters);

    res.status(200).json({
      success: true,
       result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/tasks/:id
 * Get task by ID
 */
const getTask = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = await taskService.getTask(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // EMPLOYEE can only see tasks assigned to them
    if (req.user.role === 'EMPLOYEE' && task.assignedTo !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view tasks assigned to you.'
      });
    }

    res.status(200).json({
      success: true,
       { task }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/tasks
 * Create new task (ADMIN, MANAGER only)
 */
const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
       { task }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/tasks/:id
 * Update task
 * - ADMIN/MANAGER: can update any field
 * - EMPLOYEE: can only update status, and only for tasks assigned to them
 */
const updateTask = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = await taskService.updateTask(taskId, req.body, req.user);

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
       { task }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/tasks/:id
 * Delete task (ADMIN only)
 */
const deleteTask = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id);
    await taskService.deleteTask(taskId);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
