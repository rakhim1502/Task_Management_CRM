/**
 * Task Controller
 * 
 * Handles HTTP requests for task operations with:
 * - Role-based access control
 * - Advanced filtering (status, priority, date range, user)
 * - Full-text search (title, description)
 * - Pagination & sorting
 */
const taskService = require('../services/taskService');

/**
 * GET /api/tasks
 * Get all tasks with advanced filters, search, pagination, sorting
 * 
 * Query params:
 * - status: Filter by status (TODO, IN_PROGRESS, COMPLETED)
 * - statuses: Filter by multiple statuses (comma-separated: TODO,IN_PROGRESS)
 * - priority: Filter by priority (LOW, MEDIUM, HIGH)
 * - priorities: Filter by multiple priorities (comma-separated: HIGH,MEDIUM)
 * - assignedTo: Filter by assigned user ID
 * - createdBy: Filter by creator user ID
 * - search: Search in title and description
 * - fromDate: Filter tasks created after this date (YYYY-MM-DD)
 * - toDate: Filter tasks created before this date (YYYY-MM-DD)
 * - dueFrom: Filter tasks due after this date (YYYY-MM-DD)
 * - dueTo: Filter tasks due before this date (YYYY-MM-DD)
 * - overdue: Filter overdue tasks (true/false)
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10, max: 100)
 * - sortBy: Sort field (createdAt, updatedAt, dueDate, title, priority)
 * - sortOrder: Sort direction (asc, desc)
 */
const getTasks = async (req, res, next) => {
  try {
    // Parse multiple values (comma-separated)
    const statuses = req.query.statuses 
      ? req.query.statuses.split(',').map(s => s.trim().toUpperCase())
      : undefined;

    const priorities = req.query.priorities 
      ? req.query.priorities.split(',').map(p => p.trim().toUpperCase())
      : undefined;

    const filters = {
      // Single value filters
      status: req.query.status?.toUpperCase(),
      priority: req.query.priority?.toUpperCase(),
      assignedTo: req.query.assignedTo ? parseInt(req.query.assignedTo) : undefined,
      createdBy: req.query.createdBy ? parseInt(req.query.createdBy) : undefined,
      search: req.query.search,
      
      // Date range filters
      fromDate: req.query.fromDate,
      toDate: req.query.toDate,
      dueFrom: req.query.dueFrom,
      dueTo: req.query.dueTo,
      
      // Special filters
      overdue: req.query.overdue,
      
      // Multiple value filters
      statuses,
      priorities,
      
      // Pagination
      page: req.query.page ? parseInt(req.query.page) : 1,
      limit: req.query.limit ? parseInt(req.query.limit) : 10,
      
      // Sorting
      sortBy: req.query.sortBy || 'createdAt',
      sortOrder: req.query.sortOrder?.toLowerCase() || 'desc'
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

    // Validate task ID
    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID'
      });
    }

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
 * 
 * Body: { title, description?, status?, priority?, dueDate?, assignedTo? }
 */
const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    // Validate required fields
    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    // Validate status if provided
    if (status) {
      const validStatuses = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
      if (!validStatuses.includes(status.toUpperCase())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be TODO, IN_PROGRESS, or COMPLETED'
        });
      }
    }

    // Validate priority if provided
    if (priority) {
      const validPriorities = ['LOW', 'MEDIUM', 'HIGH'];
      if (!validPriorities.includes(priority.toUpperCase())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid priority. Must be LOW, MEDIUM, or HIGH'
        });
      }
    }

    // Validate dueDate if provided
    if (dueDate) {
      const date = new Date(dueDate);
      if (isNaN(date.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid due date format'
        });
      }
    }

    const task = await taskService.createTask({
      title,
      description,
      status: status?.toUpperCase(),
      priority: priority?.toUpperCase(),
      dueDate,
      assignedTo,
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

    // Validate task ID
    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID'
      });
    }

    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    // Validate status if provided
    if (status) {
      const validStatuses = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
      if (!validStatuses.includes(status.toUpperCase())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status. Must be TODO, IN_PROGRESS, or COMPLETED'
        });
      }
    }

    // Validate priority if provided
    if (priority) {
      const validPriorities = ['LOW', 'MEDIUM', 'HIGH'];
      if (!validPriorities.includes(priority.toUpperCase())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid priority. Must be LOW, MEDIUM, or HIGH'
        });
      }
    }

    // Validate dueDate if provided
    if (dueDate) {
      const date = new Date(dueDate);
      if (isNaN(date.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid due date format'
        });
      }
    }

    const task = await taskService.updateTask(taskId, {
      ...req.body,
      status: status?.toUpperCase(),
      priority: priority?.toUpperCase()
    }, req.user);

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

    // Validate task ID
    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID'
      });
    }

    await taskService.deleteTask(taskId);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/tasks/stats
 * Get task statistics (for dashboard)
 */
const getTaskStats = async (req, res, next) => {
  try {
    const stats = await taskService.getTaskStats();

    res.status(200).json({
      success: true,
       { stats }
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
  deleteTask,
  getTaskStats
};
