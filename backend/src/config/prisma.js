/**
 * Prisma Client Singleton
 * 
 * In development, nodemon restarts the server frequently.
 * Without this singleton pattern, multiple PrismaClient instances
 * would be created, leading to connection pool exhaustion.
 * 
 * In production, a single PrismaClient is created.
 */
const { PrismaClient } = require('@prisma/client');

const globalForPrisma = global;

/**
 * @type {import('@prisma/client').PrismaClient}
 */
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'error', 'warn'] 
      : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
