/**
 * Dashboard Service
 * 
 * Business logic for dashboard statistics and aggregations
 * Uses Prisma queries and raw SQL for complex aggregations
 */
const prisma = require('../config/prisma');

/**
 * Get comprehensive dashboard statistics
 * 
 * @returns {Promise<Object>} Dashboard statistics
 */
const getDashboardStats = async () => {
  // Run all aggregations in parallel for performance
  const [
    totalUsers,
    totalEmployees,
    totalTasks,
    todoTasks,
    inProgressTasks,
    completedTasks,
    highPriorityTasks,
    mediumPriorityTasks,
    lowPriorityTasks,
    recentTasks,
    tasksByEmployee,
    overdueTasks,
    tasksCreatedThisMonth,
    tasksCompletedThisMonth
  ] = await Promise.all([
    // Total users count
    prisma.user.count(),

    // Total employees count
    prisma.user.count({ where: { role: 'EMPLOYEE' } }),

    // Total tasks count
    prisma.task.count(),

    // Tasks by status
    prisma.task.count({ where: { status: 'TODO' } }),
    prisma.task.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.task.count({ where: { status: 'COMPLETED' } }),

    // Tasks by priority
    prisma.task.count({ where: { priority: 'HIGH' } }),
    prisma.task.count({ where: { priority: 'MEDIUM' } }),
    prisma.task.count({ where: { priority: 'LOW' } }),

    // Recent tasks (last 10)
    prisma.task.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        assignee: { select: { id: true, name: true, email: true } },
        creator: { select: { id: true, name: true, email: true } }
      }
    }),

    // Tasks per employee (aggregation using raw query for better performance)
    prisma.$queryRaw`
      SELECT 
        u.id,
        u.name,
        u.email,
        COUNT(t.id)::int as "totalTasks",
        COUNT(CASE WHEN t.status = 'TODO' THEN 1 END)::int as "todoTasks",
        COUNT(CASE WHEN t.status = 'IN_PROGRESS' THEN 1 END)::int as "inProgressTasks",
        COUNT(CASE WHEN t.status = 'COMPLETED' THEN 1 END)::int as "completedTasks"
      FROM "User" u
      LEFT JOIN "Task" t ON t."assignedTo" = u.id
      WHERE u.role = 'EMPLOYEE'
      GROUP BY u.id, u.name, u.email
      ORDER BY "totalTasks" DESC
    `,

    // Overdue tasks (due date passed and not completed)
    prisma.task.count({
      where: {
        dueDate: { lt: new Date() },
        status: { not: 'COMPLETED' }
      }
    }),

    // Tasks created this month
    prisma.task.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    }),

    // Tasks completed this month
    prisma.task.count({
      where: {
        status: 'COMPLETED',
        updatedAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }
    })
  ]);

  // Calculate rates
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  const tasksPerEmployee = totalEmployees > 0
    ? Math.round(totalTasks / totalEmployees)
    : 0;

  return {
    overview: {
      totalUsers,
      totalEmployees,
      totalTasks,
      completionRate,
      tasksPerEmployee,
      overdueTasks
    },
    byStatus: {
      todo: todoTasks,
      inProgress: inProgressTasks,
      completed: completedTasks
    },
    byPriority: {
      high: highPriorityTasks,
      medium: mediumPriorityTasks,
      low: lowPriorityTasks
    },
    thisMonth: {
      created: tasksCreatedThisMonth,
      completed: tasksCompletedThisMonth
    },
    recentTasks,
    tasksByEmployee
  };
};

/**
 * Get task statistics for charts
 * 
 * @returns {Promise<Object>} Chart data
 */
const getChartData = async () => {
  // Get tasks grouped by status and priority
  const [statusData, priorityData] = await Promise.all([
    prisma.task.groupBy({
      by: ['status'],
      _count: true
    }),
    prisma.task.groupBy({
      by: ['priority'],
      _count: true
    })
  ]);

  // Format for charts
  const statusChart = {
    labels: statusData.map(item => item.status),
    values: statusData.map(item => item._count)
  };

  const priorityChart = {
    labels: priorityData.map(item => item.priority),
    values: priorityData.map(item => item._count)
  };

  return {
    statusChart,
    priorityChart
  };
};

module.exports = {
  getDashboardStats,
  getChartData
};
