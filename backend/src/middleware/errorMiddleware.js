/**
 * Global Error Handling Middleware
 * Centralizes error responses in a consistent format
 */
const errorMiddleware = (err, req, res, next) => {
  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Log error for debugging
  console.error('❌ Error:', {
    message: err.message,
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    path: req.originalUrl,
    method: req.method
  });

  // ============================================
  // PRISMA ERROR HANDLING
  // ============================================

  // Prisma: Record not found (P2025)
  if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Record not found';
  }

  // Prisma: Unique constraint violation (P2002)
  if (err.code === 'P2002') {
    statusCode = 409;
    const field = err.meta?.target?.[0] || 'field';
    message = `${field} already exists`;
  }

  // ============================================
  // JWT ERROR HANDLING
  // ============================================

  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // ============================================
  // VALIDATION ERROR HANDLING
  // ============================================

  if (err.name === 'ValidationError') {
    statusCode = 400;
    errors = err.details || null;
  }

  // ============================================
  // SEND RESPONSE
  // ============================================

  const response = {
    success: false,
    message
  };

  // Include errors array if available (validation errors)
  if (errors) {
    response.errors = errors;
  }

  // Include stack trace in development
  if (process.env.NODE_ENV !== 'production' && statusCode === 500) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorMiddleware;
