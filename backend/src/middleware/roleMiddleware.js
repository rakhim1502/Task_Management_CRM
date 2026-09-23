/**
 * Role-Based Authorization Middleware
 * Checks if the authenticated user has the required role(s)
 * 
 * Usage:
 *   router.get('/admin-only', authMiddleware, roleMiddleware('ADMIN'), controller);
 *   router.get('/managers', authMiddleware, roleMiddleware('ADMIN', 'MANAGER'), controller);
 */
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user is authenticated (authMiddleware should run first)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please login.'
      });
    }

    // Check if user's role is in the allowed roles list
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role(s): ${allowedRoles.join(', ')}. Your role: ${req.user.role}`
      });
    }

    next();
  };
};

module.exports = roleMiddleware;
