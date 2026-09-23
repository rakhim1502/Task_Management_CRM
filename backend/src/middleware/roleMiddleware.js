/**
 * Role-Based Authorization Middleware
 * 
 * Checks if the authenticated user has the required role(s)
 * Must be used AFTER authMiddleware
 * 
 * Usage:
 *   router.get('/admin-only', authMiddleware, roleMiddleware('ADMIN'), controller);
 *   router.get('/managers', authMiddleware, roleMiddleware('ADMIN', 'MANAGER'), controller);
 *   router.get('/all-authenticated', authMiddleware, roleMiddleware('ADMIN', 'MANAGER', 'EMPLOYEE'), controller);
 * 
 * Role Hierarchy:
 *   ADMIN > MANAGER > EMPLOYEE
 */

/**
 * Role-based access control middleware factory
 * 
 * @param  {...string} allowedRoles - Roles that are allowed to access the route
 * @returns {Function} Express middleware function
 */
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // ============================================
    // CHECK AUTHENTICATION
    // ============================================
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please login.'
      });
    }

    // ============================================
    // CHECK ROLE PERMISSIONS
    // ============================================

    const userRole = req.user.role;

    // If no roles specified, allow all authenticated users
    if (allowedRoles.length === 0) {
      return next();
    }

    // Check if user's role is in the allowed roles list
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.',
         {
          required: allowedRoles,
          current: userRole
        }
      });
    }

    // User has permission, continue to next middleware/controller
    next();
  };
};

/**
 * Predefined role groups for convenience
 */
roleMiddleware.ADMIN_ONLY = () => roleMiddleware('ADMIN');
roleMiddleware.MANAGER_AND_ABOVE = () => roleMiddleware('ADMIN', 'MANAGER');
roleMiddleware.ALL_AUTHENTICATED = () => roleMiddleware('ADMIN', 'MANAGER', 'EMPLOYEE');

module.exports = roleMiddleware;
