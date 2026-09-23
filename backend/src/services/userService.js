const bcrypt = require('bcrypt');
const prisma = require('../config/prisma');

const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { assignedTasks: true, createdTasks: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
};

const getUser = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      assignedTasks: { include: { creator: true } },
      createdTasks: true
    }
  });
};

const createUser = async (data) => {
  const { name, email, password, role } = data;

  if (!name || !email || !password) {
    const error = new Error('Name, email, and password are required');
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    const error = new Error('Email already exists');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: { name, email, password: hashedPassword, role: role || 'EMPLOYEE' },
    select: { id: true, name: true, email: true, role: true, createdAt: true }
  });
};

const updateUser = async (id, data) => {
  const updateData = { ...data };

  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  // Don't allow password in response
  return prisma.user.update({
    where: { id },
    data: updateData,
    select: { id: true, name: true, email: true, role: true, updatedAt: true }
  });
};

const deleteUser = async (id) => {
  return prisma.user.delete({ where: { id } });
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
