/**
 * Dashboard Controller
 * 
 * Handles HTTP requests for dashboard statistics and chart data
 */
const dashboardService = require('../services/dashboardService');

/**
 * GET /api/dashboard
 * Returns comprehensive dashboard statistics
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getDashboardStats();

    res.status(200).json({
      success: true,
       stats
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/dashboard/charts
 * Returns chart data for visualizations
 */
const getChartData = async (req, res, next) => {
  try {
    const chartData = await dashboardService.getChartData();

    res.status(200).json({
      success: true,
       chartData
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getChartData
};
