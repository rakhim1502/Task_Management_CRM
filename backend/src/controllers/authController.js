/**
 * Authentication Controller
 * 
 * Handles HTTP requests for authentication:
 * - POST /api/auth/register - Register new user
 * - POST /api/auth/login - Login user
 * - GET /api/auth/me - Get current user
 */
const authService = require('../services/authService');

/**
 * Register a new user
 * POST /api/auth/register
 * 
 * Request body: { name, email, password }
 * Response: { success, message, data: { user, token } }
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Sanitize inputs
    const sanitizedName = name?.trim();
    const sanitizedEmail = email?.trim();

    // Call service
    const result = await authService.register(sanitizedName, sanitizedEmail, password);

    // Success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
       {
        user: result.user,
        token: result.token
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * POST /api/auth/login
 * 
 * Request body: { email, password }
 * Response: { success, message, data: { user, token } }
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Sanitize email
    const sanitizedEmail = email?.trim();

    // Call service
    const result = await authService.login(sanitizedEmail, password);

    // Success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
       {
        user: result.user,
        token: result.token
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get current authenticated user
 * GET /api/auth/me
 * 
 * Requires: Authorization header with Bearer token
 * Response: { success, data: user }
 */
const getMe = async (req, res, next) => {
  try {
    // req.user is set by authMiddleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    res.status(200).json({
      success: true,
       {
        user: req.user
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe };
