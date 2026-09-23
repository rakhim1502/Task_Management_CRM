/**
 * Task Service
 * 
 * Business logic for task operations with:
 * - Role-based access control
 * - Advanced filtering (status, priority, date range, user)
 * - Full-text search (title, description)
 * - Pagination & sorting
 * - Complex query combinations
 */
const prisma = require('../config/prisma');

// Valid enum values
const VALID_STATUSES = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
const VALID_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];
const VALID_SORT_FIELDS = ['createdAt', 'updatedAt', 'dueDate', 'title', 'priority'];
const VALID_SORT_ORDERS = ['asc', 'desc'];

/**
 * Build Prisma where clause from filters
 * 
 * @param {Object} filters - Filter options
 * @returns {Object} Prisma where clause
 */
const buildWhereClause = (filters) => {
  const {
    status,
    priority,
    assignedTo,
    createdBy,
    search,
    fromDate,
    toDate,
    overdue,
    statuses,
    priorities
  } = filters;

  const where = {};

  // ============================================
  // STATUS FILTER
  // ============================================
  
  // Single status filter
  if (status && VALID_STATUSES.includes(status)) {
    where.status = status;
  }

  // Multiple statuses filter (array)
  if (statuses && Array.isArray(statuses) && statuses.length > 0) {
    const validStatuses = statuses.filter(s => VALID_STATUSES.includes(s));
    if (validStatuses.length > 0) {
      where.status = { in: validStatuses };
    }
  }

  // ============================================
  // PRIORITY FILTER
  // ============================================
  
  // Single priority filter
  if (priority && VALID_PRIORITIES.includes(priority)) {
    where.priority = priority;
  }

  // Multiple priorities filter (array)
  if (priorities && Array.isArray(priorities) && priorities.length > 0) {
    const validPriorities = priorities.filter(p => VALID_PRIORITIES.includes(p));
    if (validPriorities.length > 0) {
      where.priority = { in: validPriorities };
    }
  }

  // ============================================
  // USER FILTERS
  // ============================================
  
  // Filter by assigned user
  if (assignedTo) {
    where.assignedTo = parseInt(assignedTo);
  }

  // Filter by creator
  if (createdBy) {
    where.createdBy = parseInt(createdBy);
  }

  // ============================================
  // DATE RANGE FILTER
  // ============================================
  
  if (fromDate || toDate) {
    where.createdAt = {};

    if (fromDate) {
      const from = new Date(fromDate);
      if (!isNaN(from.getTime())) {
        where.createdAt.gte = from;
      }
    }

    if (toDate) {
      const to = new Date(toDate);
      if (!isNaN(to.getTime())) {
        // Set to end of day
        to.setHours(23, 59, 59, 999);
        where.createdAt.lte = to;
      }
    }

    // Remove empty object
    if (Object.keys(where.createdAt).length === 0) {
      delete where.createdAt;
    }
  }

  // ============================================
  // DUE DATE FILTERS
  // ============================================
  
  // Overdue tasks (due date passed and not completed)
  if (overdue === 'true' || overdue === true) {
    where.dueDate = { lt: new Date() };
    where.status = { not: 'COMPLETED' };
  }

  // Due date range
  if (filters.dueFrom || filters.dueTo) {
    where.dueDate = where.dueDate || {};

    if (filters.dueFrom) {
      const from = new Date(filters.dueFrom);
      if (!isNaN(from.getTime())) {
        where.dueDate.gte = from;
      }
    }

    if (filters.dueTo) {
      const to = new Date(filters.dueTo);
      if (!isNaN(to.getTime())) {
        to.setHours(23, 59, 59, 999);
        where.dueDate.lte = to;
      }
    }
  }

  // ============================================
  // SEARCH (Full-text in title & description)
  // ============================================
  
  if (search && search.trim().length > 0) {
    const searchTerm = search.trim();
    where.OR = [
      { title: { contains: searchTerm, mode: 'insensitive' } },
      { description: { contains: searchTerm, mode: 'insensitive' } }
    ];
  }

  return where;
};

/**
 * Build Prisma orderBy clause from sorting options
 * 
 * @param {string} sortBy - Field to sort by
 * @param {string} sortOrder - Sort direction (asc/desc)
 * @returns {Object} Prisma orderBy clause
 */
const buildOrderByClause = (sortBy = 'createdAt', sortOrder = 'desc') => {
  // Validate sort field
  const field = VALID_SORT_FIELDS.includes(sortBy) ? sortBy : 'createdAt';
  
  // Validate sort order
  const order = VALID_SORT_ORDERS.includes(sortOrder) ? sortOrder : 'desc';

  return { [field]: order };
};

/**
 * Get tasks with advanced filters, search, pagination, sorting
 * 
 * @param {Object} filters - Filter options
 * @returns {Promise<{tasks: Array, pagination: Object, filters: Object}>}
 */
const getTasks = async (filters) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = filters;

  // Validate pagination
  const validPage = Math.max(1, parseInt(page) || 1);
  const validLimit = Math.min(100, Math.max(1, parseInt(limit) || 10));

  // Build where clause
  const where = buildWhereClause(filters);

  // Build orderBy clause
  const orderBy = buildOrderByClause(sortBy, sortOrder);

  // Get tasks and total count in parallel
  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        creator: { select: { id: true, name: true, email: true } }
      },
      orderBy,
      skip: (validPage - 1) * validLimit,
      take: validLimit
    }),
    prisma.task.count({ where })
  ]);

  return {
    tasks,
    pagination: {
      page: validPage,
      limit: validLimit,
      total,
      totalPages: Math.ceil(total / validLimit)
    },
    filters: {
      applied: {
        status: filters.status || null,
        statuses: filters.statuses || null,
        priority: filters.priority || null,
        priorities: filters.priorities || null,
        assignedTo: filters.assignedTo || null,
        createdBy: filters.createdBy || null,
        search: filters.search || null,
        fromDate: filters.fromDate || null,
        toDate: filters.toDate || null,
        overdue: filters.overdue || null,
        sortBy,
        sortOrder
      }
    }
  };
};

/**
 * Get task by ID
 * 
 * @param {number} id - Task ID
 * @returns {Promise<Object|null>}
 */
const getTask = async (id) => {
  return prisma.task.findUnique({
    where: { id },
    include: {
      assignee: { select: { id: true, name: true, email: true } },
      creator: { select: { id: true, name: true, email: true } }
    }
  });
};

/**
 * Create new task
 * 
 * @param {Object} data - Task data
 * @returns {Promise<Object>}
 */
const createTask = async (data) => {
  const { title, description, status, priority, dueDate, assignedTo, createdBy } = data;

  // Validate required fields
  if (!title || title.trim().length === 0) {
    const error = new Error('Title is required');
    error.statusCode = 400;
    throw error;
  }

  // Validate assignedTo exists (if provided)
  if (assignedTo) {
    const assignee = await prisma.user.findUnique({
      where: { id: parseInt(assignedTo) }
    });

    if (!assignee) {
      const error = new Error('Assigned user not found');
      error.statusCode = 404;
      throw error;
    }

    // Validate assigned user is EMPLOYEE
    if (assignee.role !== 'EMPLOYEE') {
      const error = new Error('Can only assign tasks to EMPLOYEE role users');
      error.statusCode = 400;
      throw error;
    }
  }

  // Validate createdBy exists
  const creator = await prisma.user.findUnique({
    where: { id: createdBy }
  });

  if (!creator) {
    const error = new Error('Creator user not found');
    error.statusCode = 404;
    throw error;
  }

  // Create task
  return prisma.task.create({
     {
      title: title.trim(),
      description: description?.trim() || null,
      status: status || 'TODO',
      priority: priority || 'MEDIUM',
      dueDate: dueDate ? new Date(dueDate) : null,
      assignedTo: assignedTo ? parseInt(assignedTo) : null,
      createdBy
    },
    include: {
      assignee: { select: { id: true, name: true, email: true } },
      creator: { select: { id: true, name: true, email: true } }
    }
  });
};

/**
 * Update task with role-based access control
 * 
 * @param {number} id - Task ID
 * @param {Object} data - Update data
 * @param {Object} user - Current user (from req.user)
 * @returns {Promise<Object>}
 */
const updateTask = async (id, data, user) => {
  // Check if task exists
  const existingTask = await prisma.task.findUnique({
    where: { id }
  });

  if (!existingTask) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  // ============================================
  // ROLE-BASED ACCESS CONTROL
  // ============================================

  let updateData = { ...data };

  // EMPLOYEE: Can only update status, and only for tasks assigned to them
  if (user.role === 'EMPLOYEE') {
    // Check if task is assigned to this employee
    if (existingTask.assignedTo !== user.id) {
      const error = new Error('Access denied. You can only update tasks assigned to you.');
      error.statusCode = 403;
      throw error;
    }

    // Filter: only allow status field
    const allowedFields = ['status'];
    const filteredData = {};
    
    allowedFields.forEach(field => {
      if (data[field] !== undefined) {
        filteredData[field] = data[field];
      }
    });

    // Validate status value
    if (filteredData.status) {
      if (!VALID_STATUSES.includes(filteredData.status)) {
        const error = new Error('Invalid status. Must be TODO, IN_PROGRESS, or COMPLETED');
        error.statusCode = 400;
        throw error;
      }
    }

    updateData = filteredData;
  }

  // ADMIN/MANAGER: Can update any field
  // Validate assignedTo if provided
  if (updateData.assignedTo) {
    const assignee = await prisma.user.findUnique({
      where: { id: parseInt(updateData.assignedTo) }
    });

    if (!assignee) {
      const error = new Error('Assigned user not found');
      error.statusCode = 404;
      throw error;
    }

    if (assignee.role !== 'EMPLOYEE') {
      const error = new Error('Can only assign tasks to EMPLOYEE role users');
      error.statusCode = 400;
      throw error;
    }
  }

  // Convert date strings to Date objects
  if (updateData.dueDate) {
    const date = new Date(updateData.dueDate);
    if (isNaN(date.getTime())) {
      const error = new Error('Invalid due date format');
      error.statusCode = 400;
      throw error;
    }
    updateData.dueDate = date;
  }

  // Convert assignedTo to integer
  if (updateData.assignedTo) {
    updateData.assignedTo = parseInt(updateData.assignedTo);
  }

  // Trim title if provided
  if (updateData.title) {
    if (updateData.title.trim().length === 0) {
      const error = new Error('Title cannot be empty');
      error.statusCode = 400;
      throw error;
    }
    updateData.title = updateData.title.trim();
  }

  // Trim description if provided
  if (updateData.description) {
    updateData.description = updateData.description.trim();
  }

  // Update task
  return prisma.task.update({
    where: { id },
     updateData,
    include: {
      assignee: { select: { id: true, name: true, email: true } },
      creator: { select: { id: true, name: true, email: true } }
    }
  });
};

/**
 * Delete task
 * 
 * @param {number} id - Task ID
 * @returns {Promise<Object>}
 */
const deleteTask = async (id) => {
  // Check if task exists
  const existingTask = await prisma.task.findUnique({
    where: { id }
  });

  if (!existingTask) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  return prisma.task.delete({
    where: { id }
  });
};

/**
 * Get task statistics (for dashboard)
 * 
 * @returns {Promise<Object>}
 */
const getTaskStats = async () => {
  const [
    total,
    byStatus,
    byPriority,
    overdue
  ] = await Promise.all([
    prisma.task.count(),
    prisma.task.groupBy({
      by: ['status'],
      _count: true
    }),
    prisma.task.groupBy({
      by: ['priority'],
      _count: true
    }),
    prisma.task.count({
      where: {
        dueDate: { lt: new Date() },
        status: { not: 'COMPLETED' }
      }
    })
  ]);

  return {
    total,
    byStatus: byStatus.reduce((acc, item) => {
      acc[item.status] = item._count;
      return acc;
    }, {}),
    byPriority: byPriority.reduce((acc, item) => {
      acc[item.priority] = item._count;
      return acc;
    }, {}),
    overdue
  };
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
  VALID_STATUSES,
  VALID_PRIORITIES,
  VALID_SORT_FIELDS
};
