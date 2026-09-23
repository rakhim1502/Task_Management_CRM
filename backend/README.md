# Backend Setup Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

## Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

## Database Setup

### 1. Create PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE task_manager;

# Exit
\q
```

### 2. Configure Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your PostgreSQL credentials
# DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/task_manager"
# JWT_SECRET="your_secret_key_here"
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Run Database Migration

```bash
npx prisma migrate dev --name init
```

This will:
- Create all tables (users, tasks)
- Create all enums (Role, TaskStatus, Priority)
- Create all indexes
- Setup foreign key constraints

### 5. Seed Database (Optional)

```bash
npx prisma db seed
```

This creates:
- 1 Admin user
- 1 Manager user
- 3 Employee users
- 10 sample tasks

### 6. Start Server

```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## Prisma Commands

```bash
# Open Prisma Studio (Visual Database Browser)
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Create new migration after schema changes
npx prisma migrate dev --name migration_name

# Deploy migrations to production
npx prisma migrate deploy

# Format schema file
npx prisma format

# Validate schema
npx prisma validate
```

## Database Schema

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | Int | Primary key, auto-increment |
| name | String | User's full name |
| email | String | Unique email address |
| password | String | Bcrypt hashed password |
| role | Enum | ADMIN, MANAGER, or EMPLOYEE |
| createdAt | DateTime | Account creation timestamp |
| updatedAt | DateTime | Last update timestamp |

### Tasks Table
| Column | Type | Description |
|--------|------|-------------|
| id | Int | Primary key, auto-increment |
| title | String | Task title |
| description | String? | Optional detailed description |
| status | Enum | TODO, IN_PROGRESS, or COMPLETED |
| priority | Enum | LOW, MEDIUM, or HIGH |
| dueDate | DateTime? | Optional deadline |
| assignedTo | Int? | FK to User (nullable) |
| createdBy | Int | FK to User (required) |
| createdAt | DateTime | Task creation timestamp |
| updatedAt | DateTime | Last update timestamp |

### Relations
- User (1) → (N) Task [createdTasks]
- User (1) → (N) Task [assignedTasks]
- Task (N) → (1) User [creator]
- Task (N) → (0..1) User [assignee]

## API Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@crm.com","password":"admin123"}'
```

### Get Current User (requires token)
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Troubleshooting

### Connection Error
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists

### Migration Error
```bash
# Reset and re-migrate
npx prisma migrate reset
```

### Port Already in Use
```bash
# Change PORT in .env
PORT=5001
```

## Production Deployment

```bash
# Install production dependencies only
npm install --production

# Generate Prisma Client
npx prisma generate

# Deploy migrations
npx prisma migrate deploy

# Start server
npm start
```
