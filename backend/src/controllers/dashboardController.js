const prisma = require('../config/prisma');

/**
 * GET /api/dashboard
 * Returns aggregated statistics for the dashboard
 */
const getDashboardStats = async (req, res, next) => {
  try {
    // Run all aggregations in parallel for performance
    const [
      totalUsers,
      totalTasks,
      todoTasks,
      inProgressTasks,
      completedTasks,
      highPriorityTasks,
      mediumPriorityTasks,
      lowPriorityTasks,
      recentTasks,
      tasksByEmployee,
      overdueTasks
    ] = await Promise.all([
      // Total users count
      prisma.user.count(),

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

      // Recent tasks (last 5)
      prisma.task.findMany({
        take: 5,
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
      })
    ]);

    // Calculate completion rate
    const completionRate = totalTasks > 0 
      ? Math.round((completedTasks / totalTasks) * 100) 
      : 0;

    res.status(200).json({
      success: true,
       {
        overview: {
          totalUsers,
          totalTasks,
          completionRate
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
        overdueTasks,
        recentTasks,
        tasksByEmployee
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats };
