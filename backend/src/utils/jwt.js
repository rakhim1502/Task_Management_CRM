/**
 * JWT Utilities
 * 
 * Functions for generating and verifying JWT tokens
 */
const jwt = require('jsonwebtoken');

// JWT secret from environment
const JWT_SECRET = process.env.JWT_SECRET;

// JWT expiration from environment or default
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate JWT token
 * 
 * @param {number} userId - User ID to encode in token payload
 * @param {string} expiresIn - Token expiration time (e.g., '7d', '24h')
 * @returns {string} JWT token
 */
const generateToken = (userId, expiresIn = JWT_EXPIRES_IN) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    { id: userId },
    JWT_SECRET,
    { expiresIn }
  );
};

/**
 * Verify JWT token
 * 
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
const verifyToken = (token) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  if (!token) {
    throw new Error('Token is required');
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const err = new Error('Token expired');
      err.statusCode = 401;
      throw err;
    }
    if (error.name === 'JsonWebTokenError') {
      const err = new Error('Invalid token');
      err.statusCode = 401;
      throw err;
    }
    throw error;
  }
};

/**
 * Decode JWT token without verification
 * WARNING: Use only for debugging, not for authentication
 * 
 * @param {string} token - JWT token to decode
 * @returns {Object} Decoded token payload (unverified)
 */
const decodeToken = (token) => {
  if (!token) {
    return null;
  }

  return jwt.decode(token);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
  JWT_EXPIRES_IN
};
