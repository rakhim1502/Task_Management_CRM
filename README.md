# Task Management CRM

Production-ready Task Management CRM application built with React, Express.js, PostgreSQL, and Prisma ORM.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                       │
│  React + Vite + Tailwind CSS + React Router + Axios      │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP REST API
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   BACKEND (Express.js)                    │
│  Express + JWT + bcrypt + Prisma ORM                     │
└──────────────────────────┬──────────────────────────────┘
                           │ Prisma ORM
                           ▼
┌─────────────────────────────────────────────────────────┐
│               DATABASE (PostgreSQL)                       │
│  User model + Task model + Relations                     │
└─────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

### Frontend (this directory)
```
src/
├── components/
│   ├── common/       # Sidebar, Header, ProtectedRoute, etc.
│   ├── tasks/        # TaskList, TaskForm, TaskDetail, etc.
│   ├── users/        # UserList, UserForm, UserDetail
│   └── dashboard/    # DashboardStats, TaskChart, RecentTasks
├── pages/            # All page components
├── services/         # API service calls
├── context/          # AuthContext
├── hooks/            # Custom hooks
├── layouts/          # DashboardLayout
└── App.tsx           # Router setup
```

### Backend (backend/ directory)
```
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/prisma.js
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
├── .env.example
└── package.json
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Initialize Prisma
npx prisma generate

# Run database migration
npx prisma migrate dev --name init

# Seed database
npx prisma db seed

# Start server
npm run dev
```

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔐 Authentication

- JWT-based authentication
- bcrypt password hashing
- Role-based authorization (ADMIN, MANAGER, EMPLOYEE)

### Default Credentials (after seed)
- Admin: `admin@crm.com` / `admin123`
- Manager: `manager@crm.com` / `manager123`
- Employee: `employee1@crm.com` / `employee123`

## 📊 Database Models

### User
- id, name, email, password, role
- Relations: createdTasks, assignedTasks

### Task
- id, title, description, status, priority, dueDate
- Relations: assignedTo (User), createdBy (User)

## 🔌 API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

### Users (ADMIN only for write)
- GET `/api/users`
- GET `/api/users/:id`
- POST `/api/users`
- PUT `/api/users/:id`
- DELETE `/api/users/:id`

### Tasks
- GET `/api/tasks` (with filters: status, priority, assignedTo, search, page, limit)
- GET `/api/tasks/:id`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

### Dashboard
- GET `/api/dashboard`

## 🛠️ Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Open Prisma Studio (visual database browser)
npx prisma studio

# Seed database
npx prisma db seed

# Reset database
npx prisma migrate reset
```

## 📋 Roles & Permissions

| Feature | ADMIN | MANAGER | EMPLOYEE |
|---------|-------|---------|----------|
| View all users | ✅ | ✅ | ❌ |
| Create user | ✅ | ❌ | ❌ |
| Edit user | ✅ | ❌ | ❌ |
| Delete user | ✅ | ❌ | ❌ |
| View all tasks | ✅ | ✅ | Own only |
| Create task | ✅ | ✅ | ❌ |
| Edit task | ✅ | ✅ | Status only |
| Delete task | ✅ | ❌ | ❌ |
| View dashboard | ✅ | ✅ | ❌ |

## 🔒 Security Features

- JWT token authentication
- bcrypt password hashing (10 rounds)
- Role-based access control middleware
- Input validation
- CORS configuration
- Centralized error handling
- Environment variables for secrets
- No password in API responses
- Prisma parameterized queries (SQL injection safe)

## 📝 Environment Variables

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/task_manager"
JWT_SECRET="your_jwt_secret"
PORT=5000
```
