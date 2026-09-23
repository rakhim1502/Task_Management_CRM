/**
 * User Routes
 * 
 * All routes require authentication.
 * Write operations (POST, PUT, DELETE) require ADMIN role.
 * Read operations (GET) require ADMIN or MANAGER role.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Apply authMiddleware to all routes
router.use(authMiddleware);

/**
 * GET /api/users
 * Get all users (ADMIN, MANAGER only)
 */
router.get('/', roleMiddleware('ADMIN', 'MANAGER'), userController.getUsers);

/**
 * GET /api/users/:id
 * Get user by ID (ADMIN, MANAGER only)
 */
router.get('/:id', roleMiddleware('ADMIN', 'MANAGER'), userController.getUser);

/**
 * POST /api/users
 * Create new user (ADMIN only)
 */
router.post('/', roleMiddleware('ADMIN'), userController.createUser);

/**
 * PUT /api/users/:id
 * Update user (ADMIN only)
 */
router.put('/:id', roleMiddleware('ADMIN'), userController.updateUser);

/**
 * DELETE /api/users/:id
 * Delete user (ADMIN only)
 */
router.delete('/:id', roleMiddleware('ADMIN'), userController.deleteUser);

module.exports = router;
