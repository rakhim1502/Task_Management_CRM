const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const dashboardController = require('../controllers/dashboardController');

// All dashboard routes require authentication and ADMIN/MANAGER role
router.use(authMiddleware);
router.use(roleMiddleware('ADMIN', 'MANAGER'));

// GET /api/dashboard - Get dashboard statistics
router.get('/', dashboardController.getDashboardStats);

module.exports = router;
