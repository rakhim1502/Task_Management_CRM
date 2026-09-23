/**
 * Task Routes
 * 
 * Role-based access control:
 * - GET /api/tasks - All authenticated users (EMPLOYEE sees only own tasks)
 * - GET /api/tasks/stats - Task statistics (ADMIN, MANAGER)
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
 * GET /api/tasks/stats
 * Get task statistics (for dashboard)
 * Access: ADMIN, MANAGER only
 */
router.get('/stats', roleMiddleware('ADMIN', 'MANAGER'), taskController.getTaskStats);

/**
 * GET /api/tasks
 * Get all tasks with advanced filters, search, pagination, sorting
 * 
 * Query params:
 * - status: Filter by status (TODO, IN_PROGRESS, COMPLETED)
 * - statuses: Filter by multiple statuses (comma-separated: TODO,IN_PROGRESS)
 * - priority: Filter by priority (LOW, MEDIUM, HIGH)
 * - priorities: Filter by multiple priorities (comma-separated: HIGH,MEDIUM)
 * - assignedTo: Filter by assigned user ID
 * - createdBy: Filter by creator user ID
 * - search: Search in title and description
 * - fromDate: Filter tasks created after this date (YYYY-MM-DD)
 * - toDate: Filter tasks created before this date (YYYY-MM-DD)
 * - dueFrom: Filter tasks due after this date (YYYY-MM-DD)
 * - dueTo: Filter tasks due before this date (YYYY-MM-DD)
 * - overdue: Filter overdue tasks (true/false)
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10, max: 100)
 * - sortBy: Sort field (createdAt, updatedAt, dueDate, title, priority)
 * - sortOrder: Sort direction (asc, desc)
 * 
 * Access:
 * - ADMIN/MANAGER: sees all tasks
 * - EMPLOYEE: sees only tasks assigned to them
 */
router.get('/', taskController.getTasks);

/**
 * GET /api/tasks/:id
 * Get task by ID
 * 
 * Access:
 * - ADMIN/MANAGER: can see any task
 * - EMPLOYEE: can only see tasks assigned to them
 */
router.get('/:id', taskController.getTask);

/**
 * POST /api/tasks
 * Create new task
 * 
 * Body: { title, description?, status?, priority?, dueDate?, assignedTo? }
 * 
 * Access: ADMIN, MANAGER only
 */
router.post('/', roleMiddleware('ADMIN', 'MANAGER'), taskController.createTask);

/**
 * PUT /api/tasks/:id
 * Update task
 * 
 * Body: { title?, description?, status?, priority?, dueDate?, assignedTo? }
 * 
 * Access:
 * - ADMIN/MANAGER: can update any field
 * - EMPLOYEE: can only update status, and only for tasks assigned to them
 */
router.put('/:id', taskController.updateTask);

/**
 * DELETE /api/tasks/:id
 * Delete task
 * 
 * Access: ADMIN only
 */
router.delete('/:id', roleMiddleware('ADMIN'), taskController.deleteTask);

module.exports = router;
