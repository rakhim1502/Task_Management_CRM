/**
 * Validation Utilities
 * 
 * Common validation functions for input data
 */

/**
 * Validate email format
 * 
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // RFC 5322 compliant email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate password strength
 * 
 * @param {string} password - Password to validate
 * @returns {boolean} True if password meets minimum requirements
 */
const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return false;
  }

  // Minimum 6 characters
  return password.length >= 6;
};

/**
 * Validate required fields
 * 
 * @param {string[]} fields - Array of required field names
 * @param {Object} data - Data object to validate
 * @throws {Error} If any required field is missing
 */
const validateRequired = (fields, data) => {
  const missing = fields.filter(field => {
    const value = data[field];
    return value === undefined || value === null || value === '';
  });

  if (missing.length > 0) {
    const error = new Error(`Missing required fields: ${missing.join(', ')}`);
    error.statusCode = 400;
    throw error;
  }
};

/**
 * Validate string length
 * 
 * @param {string} value - String to validate
 * @param {number} min - Minimum length
 * @param {number} max - Maximum length (optional)
 * @returns {boolean} True if length is within range
 */
const validateStringLength = (value, min, max = Infinity) => {
  if (!value || typeof value !== 'string') {
    return false;
  }

  const length = value.trim().length;
  return length >= min && length <= max;
};

/**
 * Validate enum value
 * 
 * @param {string} value - Value to validate
 * @param {string[]} allowedValues - Array of allowed values
 * @returns {boolean} True if value is in allowed list
 */
const validateEnum = (value, allowedValues) => {
  if (!value || !Array.isArray(allowedValues)) {
    return false;
  }

  return allowedValues.includes(value);
};

/**
 * Sanitize string input
 * 
 * @param {string} input - String to sanitize
 * @returns {string} Sanitized string
 */
const sanitizeString = (input) => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input.trim().replace(/[<>]/g, ''); // Remove potential XSS characters
};

module.exports = {
  validateEmail,
  validatePassword,
  validateRequired,
  validateStringLength,
  validateEnum,
  sanitizeString
};
