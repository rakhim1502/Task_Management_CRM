/**
 * Task Routes
 * 
 * Role-based access control:
 * - GET /api/tasks - All authenticated users (EMPLOYEE sees only own tasks)
 * - GET /api/tasks/:id - All authenticated users (EMPLOYEE sees only own tasks)
 * - POST /api/tasks - ADMIN, MANAGER only
 * - PUT /api/tasks/:id - ADMIN, MANAGER (full edit), EMPLOYEE (status only, own tasks)
 * - DELETE /api/tasks/:id - ADMIN only
 */
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Apply authMiddleware to all routes
router.use(authMiddleware);

/**
 * GET /api/tasks
 * Get all tasks with filters, search, pagination
 * - ADMIN/MANAGER: sees all tasks
 * - EMPLOYEE: sees only tasks assigned to them
 */
router.get('/', taskController.getTasks);

/**
 * GET /api/tasks/:id
 * Get task by ID
 * - ADMIN/MANAGER: can see any task
 * - EMPLOYEE: can only see tasks assigned to them
 */
router.get('/:id', taskController.getTask);

/**
 * POST /api/tasks
 * Create new task (ADMIN, MANAGER only)
 */
router.post('/', roleMiddleware('ADMIN', 'MANAGER'), taskController.createTask);

/**
 * PUT /api/tasks/:id
 * Update task
 * - ADMIN/MANAGER: can update any field
 * - EMPLOYEE: can only update status, and only for tasks assigned to them
 */
router.put('/:id', taskController.updateTask);

/**
 * DELETE /api/tasks/:id
 * Delete task (ADMIN only)
 */
router.delete('/:id', roleMiddleware('ADMIN'), taskController.deleteTask);

module.exports = router;
