/**
 * Task Service
 * 
 * Business logic for task operations with role-based access control
 */
const prisma = require('../config/prisma');

/**
 * Get tasks with filters, search, pagination
 * 
 * @param {Object} filters - Filter options
 * @returns {Promise<{tasks: Array, pagination: Object}>}
 */
const getTasks = async (filters) => {
  const { status, priority, assignedTo, createdBy, search, page = 1, limit = 10 } = filters;

  // Build where clause
  const where = {};

  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (assignedTo) where.assignedTo = assignedTo;
  if (createdBy) where.createdBy = createdBy;

  // Search in title and description
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

  // Get tasks and total count in parallel
  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        creator: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.task.count({ where })
  ]);

  return {
    tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
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
      const validStatuses = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
      if (!validStatuses.includes(filteredData.status)) {
        const error = new Error('Invalid status. Must be TODO, IN_PROGRESS, or COMPLETED');
        error.statusCode = 400;
        throw error;
      }
    }

    updateData = filteredData;
  }

  // ADMIN/MANAGER: Can update any field
  // Convert date strings to Date objects
  if (updateData.dueDate) {
    updateData.dueDate = new Date(updateData.dueDate);
  }

  // Convert assignedTo to integer
  if (updateData.assignedTo) {
    updateData.assignedTo = parseInt(updateData.assignedTo);
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

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
