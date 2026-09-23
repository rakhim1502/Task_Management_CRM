const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const managerPassword = await bcrypt.hash('manager123', 10);
  const employeePassword = await bcrypt.hash('employee123', 10);

  // Create users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@crm.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@crm.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@crm.com' },
    update: {},
    create: {
      name: 'Manager User',
      email: 'manager@crm.com',
      password: managerPassword,
      role: 'MANAGER'
    }
  });

  const employee1 = await prisma.user.upsert({
    where: { email: 'employee1@crm.com' },
    update: {},
    create: {
      name: 'Employee One',
      email: 'employee1@crm.com',
      password: employeePassword,
      role: 'EMPLOYEE'
    }
  });

  const employee2 = await prisma.user.upsert({
    where: { email: 'employee2@crm.com' },
    update: {},
    create: {
      name: 'Employee Two',
      email: 'employee2@crm.com',
      password: employeePassword,
      role: 'EMPLOYEE'
    }
  });

  const employee3 = await prisma.user.upsert({
    where: { email: 'employee3@crm.com' },
    update: {},
    create: {
      name: 'Employee Three',
      email: 'employee3@crm.com',
      password: employeePassword,
      role: 'EMPLOYEE'
    }
  });

  console.log('✅ Users created');

  // Create tasks
  const tasks = [
    {
      title: 'Website redesign',
      description: 'Redesign the company website with modern UI/UX',
      status: 'TODO',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      assignedTo: employee1.id,
      createdBy: admin.id
    },
    {
      title: 'API integration',
      description: 'Integrate third-party payment API',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      assignedTo: employee2.id,
      createdBy: manager.id
    },
    {
      title: 'Database optimization',
      description: 'Optimize slow database queries',
      status: 'COMPLETED',
      priority: 'MEDIUM',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      assignedTo: employee3.id,
      createdBy: admin.id
    },
    {
      title: 'Write documentation',
      description: 'Write API documentation for developers',
      status: 'TODO',
      priority: 'LOW',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      assignedTo: employee1.id,
      createdBy: manager.id
    },
    {
      title: 'Bug fixes',
      description: 'Fix reported bugs in production',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      assignedTo: employee2.id,
      createdBy: admin.id
    },
    {
      title: 'Security audit',
      description: 'Conduct security audit of the application',
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      assignedTo: employee3.id,
      createdBy: manager.id
    }
  ];

  for (const task of tasks) {
    await prisma.task.create({ data: task });
  }

  console.log('✅ Tasks created');
  console.log('🎉 Seed completed successfully!');
  console.log('\n📋 Login credentials:');
  console.log('  Admin:    admin@crm.com / admin123');
  console.log('  Manager:  manager@crm.com / manager123');
  console.log('  Employee: employee1@crm.com / employee123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
