/**
 * Dashboard Routes
 * 
 * All routes require authentication and ADMIN/MANAGER role
 */
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Apply authMiddleware and roleMiddleware to all routes
router.use(authMiddleware);
router.use(roleMiddleware('ADMIN', 'MANAGER'));

/**
 * GET /api/dashboard
 * Get comprehensive dashboard statistics
 */
router.get('/', dashboardController.getDashboardStats);

/**
 * GET /api/dashboard/charts
 * Get chart data for visualizations
 */
router.get('/charts', dashboardController.getChartData);

module.exports = router;
