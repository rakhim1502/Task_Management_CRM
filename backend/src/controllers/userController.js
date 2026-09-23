/**
 * User Controller
 * 
 * Handles HTTP requests for user operations with role-based access control:
 * - ADMIN: Full CRUD access
 * - MANAGER: Read-only access
 * - EMPLOYEE: Can view/update own profile
 */
const userService = require('../services/userService');

/**
 * GET /api/users
 * Get all users with pagination, filtering, and search (ADMIN, MANAGER only)
 * 
 * Query params:
 * - role: Filter by role (ADMIN, MANAGER, EMPLOYEE)
 * - search: Search in name and email
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10)
 * - sortBy: Sort field (createdAt, name, email, role)
 * - sortOrder: Sort order (asc, desc)
 */
const getUsers = async (req, res, next) => {
  try {
    const filters = {
      role: req.query.role,
      search: req.query.search,
      page: req.query.page ? parseInt(req.query.page) : 1,
      limit: req.query.limit ? parseInt(req.query.limit) : 10,
      sortBy: req.query.sortBy || 'createdAt',
      sortOrder: req.query.sortOrder || 'desc'
    };

    const result = await userService.getUsers(filters);

    res.status(200).json({
      success: true,
       result
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
 * GET /api/users/profile/me
 * Get current user's profile (all authenticated users)
 */
const getMyProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.user.id);

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
 * PUT /api/users/profile/me
 * Update current user's profile (all authenticated users)
 * Can update: name, email, password (not role)
 */
const updateMyProfile = async (req, res, next) => {
  try {
    // Filter: only allow name, email, password (not role)
    const allowedFields = ['name', 'email', 'password'];
    const updateData = {};
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const user = await userService.updateUser(req.user.id, updateData);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
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
  getMyProfile,
  updateMyProfile,
  createUser,
  updateUser,
  deleteUser
};
