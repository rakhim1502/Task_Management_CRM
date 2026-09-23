const prisma = require('../config/prisma');

const getTasks = async (filters) => {
  const { status, priority, assignedTo, createdBy, search, page = 1, limit = 10 } = filters;

  const where = {};

  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (assignedTo) where.assignedTo = assignedTo;
  if (createdBy) where.createdBy = createdBy;

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }

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

const getTask = async (id) => {
  return prisma.task.findUnique({
    where: { id },
    include: {
      assignee: { select: { id: true, name: true, email: true } },
      creator: { select: { id: true, name: true, email: true } }
    }
  });
};

const createTask = async (data) => {
  const { title, description, status, priority, dueDate, assignedTo, createdBy } = data;

  if (!title) {
    const error = new Error('Title is required');
    error.statusCode = 400;
    throw error;
  }

  return prisma.task.create({
    data: {
      title,
      description,
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

const updateTask = async (id, data, user) => {
  // Employee can only update status
  if (user.role === 'EMPLOYEE') {
    const allowedFields = ['status'];
    const filteredData = {};
    allowedFields.forEach(field => {
      if (data[field]) filteredData[field] = data[field];
    });
    data = filteredData;
  }

  if (data.dueDate) {
    data.dueDate = new Date(data.dueDate);
  }

  if (data.assignedTo) {
    data.assignedTo = parseInt(data.assignedTo);
  }

  return prisma.task.update({
    where: { id },
    data,
    include: {
      assignee: { select: { id: true, name: true, email: true } },
      creator: { select: { id: true, name: true, email: true } }
    }
  });
};

const deleteTask = async (id) => {
  return prisma.task.delete({ where: { id } });
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
