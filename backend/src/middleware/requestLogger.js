/**
 * Request Logger Middleware
 * Logs all incoming requests in development mode
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Log when response finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    const method = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;
    const color = getStatusColor(status);

    console.log(
      `${color}${method}\x1b[0m ${url} ${color}${status}\x1b[0m - ${duration}ms`
    );
  });

  next();
};

/**
 * Get color code based on HTTP status
 */
const getStatusColor = (status) => {
  if (status >= 500) return '\x1b[31m'; // Red
  if (status >= 400) return '\x1b[33m'; // Yellow
  if (status >= 300) return '\x1b[36m'; // Cyan
  if (status >= 200) return '\x1b[32m'; // Green
  return '\x1b[0m'; // Default
};

module.exports = requestLogger;
