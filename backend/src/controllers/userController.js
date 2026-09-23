/**
 * User Controller
 * 
 * Handles HTTP requests for user operations with role-based access control:
 * - ADMIN: Full CRUD access
 * - MANAGER: Read-only access
 * - EMPLOYEE: No access (blocked by roleMiddleware)
 */
const userService = require('../services/userService');

/**
 * GET /api/users
 * Get all users (ADMIN, MANAGER only)
 */
const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json({
      success: true,
       { users }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/users/:id
 * Get user by ID (ADMIN, MANAGER only)
 */
const getUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userService.getUser(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
       { user }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/users
 * Create new user (ADMIN only)
 */
const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
       { user }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/users/:id
 * Update user (ADMIN only)
 */
const updateUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userService.updateUser(userId, req.body);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
       { user }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/users/:id
 * Delete user (ADMIN only)
 */
const deleteUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    
    // Prevent admin from deleting themselves
    if (userId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    await userService.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
