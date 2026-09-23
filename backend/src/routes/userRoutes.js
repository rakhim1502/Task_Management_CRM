/**
 * User Routes
 * 
 * Role-based access control:
 * - GET /api/users - ADMIN, MANAGER (with pagination, filtering, search)
 * - GET /api/users/:id - ADMIN, MANAGER
 * - POST /api/users - ADMIN only
 * - PUT /api/users/:id - ADMIN only
 * - DELETE /api/users/:id - ADMIN only
 * 
 * Profile management (all authenticated users):
 * - GET /api/users/profile/me - Get own profile
 * - PUT /api/users/profile/me - Update own profile
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Apply authMiddleware to all routes
router.use(authMiddleware);

// ============================================
// PROFILE MANAGEMENT (All authenticated users)
// ============================================

/**
 * GET /api/users/profile/me
 * Get current user's profile
 */
router.get('/profile/me', userController.getMyProfile);

/**
 * PUT /api/users/profile/me
 * Update current user's profile
 */
router.put('/profile/me', userController.updateMyProfile);

// ============================================
// USER MANAGEMENT (ADMIN, MANAGER)
// ============================================

/**
 * GET /api/users
 * Get all users with pagination, filtering, search
 * ADMIN, MANAGER only
 */
router.get('/', roleMiddleware('ADMIN', 'MANAGER'), userController.getUsers);

/**
 * GET /api/users/:id
 * Get user by ID
 * ADMIN, MANAGER only
 */
router.get('/:id', roleMiddleware('ADMIN', 'MANAGER'), userController.getUser);

/**
 * POST /api/users
 * Create new user
 * ADMIN only
 */
router.post('/', roleMiddleware('ADMIN'), userController.createUser);

/**
 * PUT /api/users/:id
 * Update user
 * ADMIN only
 */
router.put('/:id', roleMiddleware('ADMIN'), userController.updateUser);

/**
 * DELETE /api/users/:id
 * Delete user
 * ADMIN only
 */
router.delete('/:id', roleMiddleware('ADMIN'), userController.deleteUser);

module.exports = router;
