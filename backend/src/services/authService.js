/**
 * Authentication Service
 * 
 * Handles user registration and login with:
 * - Input validation
 * - Password hashing (bcrypt)
 * - JWT token generation
 * - Email uniqueness check
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');
const { validateEmail, validatePassword } = require('../utils/validation');

// Bcrypt salt rounds (higher = more secure but slower)
const SALT_ROUNDS = 10;

// JWT expiration
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Register a new user
 * 
 * @param {string} name - User's full name
 * @param {string} email - User's email address
 * @param {string} password - User's password (min 6 characters)
 * @returns {Promise<{user: Object, token: string}>}
 */
const register = async (name, email, password) => {
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

  // Validate password strength
  if (!validatePassword(password)) {
    const error = new Error('Password must be at least 6 characters');
    error.statusCode = 400;
    throw error;
  }

  // Normalize email (lowercase, trim)
  const normalizedEmail = email.toLowerCase().trim();

  // ============================================
  // CHECK IF USER EXISTS
  // ============================================
  
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  });

  if (existingUser) {
    const error = new Error('Email already registered');
    error.statusCode = 409; // Conflict
    throw error;
  }

  // ============================================
  // HASH PASSWORD
  // ============================================
  
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // ============================================
  // CREATE USER
  // ============================================
  
  const user = await prisma.user.create({
     {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: 'EMPLOYEE' // Default role for new registrations
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });

  // ============================================
  // GENERATE JWT TOKEN
  // ============================================
  
  const token = generateToken(user.id);

  return { user, token };
};

/**
 * Login user
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<{user: Object, token: string}>}
 */
const login = async (email, password) => {
  // ============================================
  // INPUT VALIDATION
  // ============================================
  
  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.statusCode = 400;
    throw error;
  }

  // Normalize email
  const normalizedEmail = email.toLowerCase().trim();

  // ============================================
  // FIND USER
  // ============================================
  
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  });

  if (!user) {
    // Don't reveal if email exists or not (security best practice)
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // ============================================
  // VERIFY PASSWORD
  // ============================================
  
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  // ============================================
  // GENERATE JWT TOKEN
  // ============================================
  
  const token = generateToken(user.id);

  // Return user data (exclude password)
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    },
    token
  };
};

/**
 * Generate JWT token
 * 
 * @param {number} userId - User ID to encode in token
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

module.exports = { register, login };
