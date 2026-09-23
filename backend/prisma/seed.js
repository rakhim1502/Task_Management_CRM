/**
 * Prisma Seed Script
 * 
 * Creates initial data for the Task Management CRM:
 * - 1 Admin user
 * - 1 Manager user
 * - 3 Employee users
 * - 10 Tasks with various statuses and priorities
 * 
 * Usage:
 *   npx prisma db seed
 *   or
 *   npm run prisma:seed
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('');
  console.log('🌱 Starting database seed...');
  console.log('='.repeat(50));

  // ============================================
  // DELETE EXISTING DATA (in reverse order of dependencies)
  // ============================================
  console.log('\n🗑️  Cleaning existing data...');
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();
  console.log('   ✅ Existing data cleared');

  // ============================================
  // HASH PASSWORDS
  // ============================================
  console.log('\n🔐 Hashing passwords...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  const managerPassword = await bcrypt.hash('manager123', 10);
  const employeePassword = await bcrypt.hash('employee123', 10);
  console.log('   ✅ Passwords hashed (bcrypt, 10 rounds)');

  // ============================================
  // CREATE USERS
  // ============================================
  console.log('\n👥 Creating users...');

  // Admin
  const admin = await prisma.user.create({
     {
      name: 'Admin User',
      email: 'admin@crm.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  });
  console.log(`   ✅ Admin: ${admin.email}`);

  // Manager
  const manager = await prisma.user.create({
     {
      name: 'Sarah Manager',
      email: 'manager@crm.com',
      password: managerPassword,
      role: 'MANAGER'
    }
  });
  console.log(`   ✅ Manager: ${manager.email}`);

  // Employees
  const employee1 = await prisma.user.create({
     {
      name: 'John Developer',
      email: 'employee1@crm.com',
      password: employeePassword,
      role: 'EMPLOYEE'
    }
  });
  console.log(`   ✅ Employee 1: ${employee1.email}`);

  const employee2 = await prisma.user.create({
     {
      name: 'Emma Designer',
      email: 'employee2@crm.com',
      password: employeePassword,
      role: 'EMPLOYEE'
    }
  });
  console.log(`   ✅ Employee 2: ${employee2.email}`);

  const employee3 = await prisma.user.create({
     {
      name: 'Mike Analyst',
      email: 'employee3@crm.com',
      password: employeePassword,
      role: 'EMPLOYEE'
    }
  });
  console.log(`   ✅ Employee 3: ${employee3.email}`);

  // ============================================
  // CREATE TASKS
  // ============================================
  console.log('\n📋 Creating tasks...');

  const tasks = [
    // TODO tasks
    {
      title: 'Website Redesign',
      description: 'Redesign the company website with modern UI/UX principles. Focus on mobile responsiveness and accessibility.',
      status: 'TODO',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      assignedTo: employee1.id,
      createdBy: admin.id
    },
    {
      title: 'Write API Documentation',
      description: 'Create comprehensive API documentation for all REST endpoints including request/response examples.',
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      assignedTo: employee2.id,
      createdBy: manager.id
    },
    {
      title: 'Security Audit',
      description: 'Conduct a thorough security audit of the application. Check for vulnerabilities, XSS, CSRF, and SQL injection risks.',
      status: 'TODO',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
      assignedTo: employee3.id,
      createdBy: admin.id
    },
    {
      title: 'Setup CI/CD Pipeline',
      description: 'Configure automated testing and deployment pipeline using GitHub Actions.',
      status: 'TODO',
      priority: 'LOW',
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days
      assignedTo: employee1.id,
      createdBy: manager.id
    },

    // IN_PROGRESS tasks
    {
      title: 'Payment Gateway Integration',
      description: 'Integrate Stripe payment gateway for subscription management. Include webhook handling and error recovery.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      assignedTo: employee2.id,
      createdBy: admin.id
    },
    {
      title: 'Database Query Optimization',
      description: 'Identify and optimize slow database queries. Add proper indexes and review N+1 query problems.',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      assignedTo: employee1.id,
      createdBy: manager.id
    },
    {
      title: 'User Analytics Dashboard',
      description: 'Build analytics dashboard showing user engagement metrics, conversion rates, and retention data.',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days
      assignedTo: employee3.id,
      createdBy: admin.id
    },

    // COMPLETED tasks
    {
      title: 'Authentication System',
      description: 'Implement JWT-based authentication with refresh tokens, password reset, and email verification.',
      status: 'COMPLETED',
      priority: 'HIGH',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (completed)
      assignedTo: employee1.id,
      createdBy: admin.id
    },
    {
      title: 'Email Notification Service',
      description: 'Setup email notification system for task assignments, due date reminders, and status updates.',
      status: 'COMPLETED',
      priority: 'MEDIUM',
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      assignedTo: employee2.id,
      createdBy: manager.id
    },
    {
      title: 'Bug Fixes - Sprint 1',
      description: 'Fix all critical bugs reported in Sprint 1 including login issues and data validation errors.',
      status: 'COMPLETED',
      priority: 'LOW',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      assignedTo: employee3.id,
      createdBy: admin.id
    }
  ];

  for (const task of tasks) {
    await prisma.task.create({  task });
    console.log(`   ✅ Task: "${task.title}" [${task.status}] [${task.priority}]`);
  }

  // ============================================
  // SUMMARY
  // ============================================
  console.log('\n' + '='.repeat(50));
  console.log('🎉 Seed completed successfully!');
  console.log('='.repeat(50));
  console.log('\n📊 Summary:');
  console.log(`   👥 Users: 5 (1 Admin, 1 Manager, 3 Employees)`);
  console.log(`   📋 Tasks: ${tasks.length} (4 TODO, 3 In Progress, 3 Completed)`);

  console.log('\n🔑 Login Credentials:');
  console.log('   ┌─────────────────────────────────────────────┐');
  console.log('   │ Role      │ Email              │ Password   │');
  console.log('   ├─────────────────────────────────────────────┤');
  console.log('   │ ADMIN     │ admin@crm.com      │ admin123   │');
  console.log('   │ MANAGER   │ manager@crm.com    │ manager123 │');
  console.log('   │ EMPLOYEE  │ employee1@crm.com  │ employee123│');
  console.log('   │ EMPLOYEE  │ employee2@crm.com  │ employee123│');
  console.log('   │ EMPLOYEE  │ employee3@crm.com  │ employee123│');
  console.log('   └─────────────────────────────────────────────┘');
  console.log('');
}

// ============================================
// EXECUTE
// ============================================
main()
  .catch((e) => {
    console.error('\n❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
