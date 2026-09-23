/**
 * Authentication Routes
 * 
 * POST /api/auth/register - Register new user
 * POST /api/auth/login - Login user
 * GET /api/auth/me - Get current authenticated user
 */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * POST /api/auth/register
 * 
 * Register a new user
 * Body: { name: string, email: string, password: string }
 */
router.post('/register', authController.register);

/**
 * POST /api/auth/login
 * 
 * Login user
 * Body: { email: string, password: string }
 */
router.post('/login', authController.login);

/**
 * GET /api/auth/me
 * 
 * Get current authenticated user
 * Requires: Authorization header with Bearer token
 */
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
