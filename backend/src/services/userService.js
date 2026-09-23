/**
 * User Service
 * 
 * Business logic for user operations
 */
const bcrypt = require('bcrypt');
const prisma = require('../config/prisma');
const { validateEmail, validatePassword } = require('../utils/validation');

// Bcrypt salt rounds
const SALT_ROUNDS = 10;

/**
 * Get all users (exclude password)
 * 
 * @returns {Promise<Array>}
 */
const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          assignedTasks: true,
          createdTasks: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

/**
 * Get user by ID (exclude password)
 * 
 * @param {number} id - User ID
 * @returns {Promise<Object|null>}
 */
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
      assignedTasks: {
        include: {
          creator: { select: { id: true, name: true, email: true } }
        }
      },
      createdTasks: {
        include: {
          assignee: { select: { id: true, name: true, email: true } }
        }
      }
    }
  });
};

/**
 * Create new user
 * 
 * @param {Object} data - User data
 * @returns {Promise<Object>}
 */
const createUser = async (data) => {
  const { name, email, password, role } = data;

  // ============================================
  // INPUT VALIDATION
  // ============================================

  if (!name || !email || !password) {
    const error = new Error('Name, email, and password are required');
    error.statusCode = 400;
    throw error;
  }

  // Validate name
  if (name.trim().length < 2) {
    const error = new Error('Name must be at least 2 characters');
    error.statusCode = 400;
    throw error;
  }

  // Validate email format
  if (!validateEmail(email)) {
    const error = new Error('Invalid email format');
    error.statusCode = 400;
    throw error;
  }

  // Validate password
  if (!validatePassword(password)) {
    const error = new Error('Password must be at least 6 characters');
    error.statusCode = 400;
    throw error;
  }

  // Validate role
  if (role) {
    const validRoles = ['ADMIN', 'MANAGER', 'EMPLOYEE'];
    if (!validRoles.includes(role)) {
      const error = new Error('Invalid role. Must be ADMIN, MANAGER, or EMPLOYEE');
      error.statusCode = 400;
      throw error;
    }
  }

  // Normalize email
  const normalizedEmail = email.toLowerCase().trim();

  // ============================================
  // CHECK IF USER EXISTS
  // ============================================

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  });

  if (existingUser) {
    const error = new Error('Email already exists');
    error.statusCode = 409;
    throw error;
  }

  // ============================================
  // HASH PASSWORD & CREATE USER
  // ============================================

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return prisma.user.create({
     {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: role || 'EMPLOYEE'
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });
};

/**
 * Update user
 * 
 * @param {number} id - User ID
 * @param {Object} data - Update data
 * @returns {Promise<Object>}
 */
const updateUser = async (id, data) => {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id }
  });

  if (!existingUser) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const updateData = { ...data };

  // ============================================
  // VALIDATE & PROCESS FIELDS
  // ============================================

  // Validate email if provided
  if (updateData.email) {
    if (!validateEmail(updateData.email)) {
      const error = new Error('Invalid email format');
      error.statusCode = 400;
      throw error;
    }

    const normalizedEmail = updateData.email.toLowerCase().trim();

    // Check if email is already taken by another user
    const emailExists = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (emailExists && emailExists.id !== id) {
      const error = new Error('Email already exists');
      error.statusCode = 409;
      throw error;
    }

    updateData.email = normalizedEmail;
  }

  // Hash password if provided
  if (updateData.password) {
    if (!validatePassword(updateData.password)) {
      const error = new Error('Password must be at least 6 characters');
      error.statusCode = 400;
      throw error;
    }
    updateData.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
  }

  // Validate role if provided
  if (updateData.role) {
    const validRoles = ['ADMIN', 'MANAGER', 'EMPLOYEE'];
    if (!validRoles.includes(updateData.role)) {
      const error = new Error('Invalid role. Must be ADMIN, MANAGER, or EMPLOYEE');
      error.statusCode = 400;
      throw error;
    }
  }

  // Trim name if provided
  if (updateData.name) {
    if (updateData.name.trim().length < 2) {
      const error = new Error('Name must be at least 2 characters');
      error.statusCode = 400;
      throw error;
    }
    updateData.name = updateData.name.trim();
  }

  // ============================================
  // UPDATE USER
  // ============================================

  return prisma.user.update({
    where: { id },
     updateData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

/**
 * Delete user
 * 
 * @param {number} id - User ID
 * @returns {Promise<Object>}
 */
const deleteUser = async (id) => {
  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id }
  });

  if (!existingUser) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return prisma.user.delete({
    where: { id }
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
