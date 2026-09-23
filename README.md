# Task Management CRM

Professional task management system built with React, Express.js, PostgreSQL, and Prisma ORM.

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Authentication & Authorization
- ✅ JWT-based authentication
- ✅ bcrypt password hashing
- ✅ Role-based access control (ADMIN, MANAGER, EMPLOYEE)
- ✅ Protected routes
- ✅ Automatic token refresh

### User Management
- ✅ Create, read, update, delete users
- ✅ Role assignment
- ✅ User search and filtering
- ✅ Profile management

### Task Management
- ✅ Create, read, update, delete tasks
- ✅ Task assignment to employees
- ✅ Status tracking (TODO, IN_PROGRESS, COMPLETED)
- ✅ Priority levels (LOW, MEDIUM, HIGH)
- ✅ Due date management
- ✅ Advanced filtering and search
- ✅ Pagination support

### Dashboard
- ✅ Real-time statistics
- ✅ Task distribution charts
- ✅ Employee performance metrics
- ✅ Recent tasks overview
- ✅ Completion rate tracking

### Security
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Rate limiting ready
- ✅ Environment variable management

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 14+
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: Custom validators

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **State Management**: React Context API

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                       │
│  React + Vite + TypeScript + Tailwind CSS + React Router │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP REST API
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   BACKEND (Express.js)                    │
│  Express + JWT + bcrypt + Prisma ORM + Middleware        │
└──────────────────────────┬──────────────────────────────┘
                           │ Prisma ORM
                           ▼
┌─────────────────────────────────────────────────────────┐
│               DATABASE (PostgreSQL)                       │
│  User Model + Task Model + Relations + Indexes           │
└─────────────────────────────────────────────────────────┘
```

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### Backend Setup

```bash
# Clone repository
git clone <your-repo-url>
cd task-management-crm/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
nano .env

# Setup database
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your API URL
nano .env

# Start development server
npm run dev
```

## ⚙️ Configuration

### Backend Environment Variables

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/task_manager"

# JWT
JWT_SECRET="your_super_secret_jwt_key_min_32_chars"
JWT_EXPIRES_IN="7d"

# Server
PORT=5000
NODE_ENV="development"

# CORS
FRONTEND_URL="http://localhost:5173"
```

### Frontend Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Usage

### Development

**Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### Production Build

```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@crm.com | admin123 |
| Manager | manager@crm.com | manager123 |
| Employee | employee1@crm.com | employee123 |
| Employee | employee2@crm.com | employee123 |
| Employee | employee3@crm.com | employee123 |

## 📚 API Documentation

### Authentication

```bash
# Register
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

# Login
POST /api/auth/login
{
  "email": "admin@crm.com",
  "password": "admin123"
}

# Get Current User
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

### Users

```bash
# Get all users (ADMIN, MANAGER)
GET /api/users

# Get user by ID (ADMIN, MANAGER)
GET /api/users/:id

# Create user (ADMIN)
POST /api/users
{
  "name": "New User",
  "email": "newuser@crm.com",
  "password": "password123",
  "role": "EMPLOYEE"
}

# Update user (ADMIN)
PUT /api/users/:id
{
  "name": "Updated Name",
  "role": "MANAGER"
}

# Delete user (ADMIN)
DELETE /api/users/:id
```

### Tasks

```bash
# Get all tasks with filters
GET /api/tasks?status=TODO&priority=HIGH&search=bug&page=1&limit=10

# Get task by ID
GET /api/tasks/:id

# Create task (ADMIN, MANAGER)
POST /api/tasks
{
  "title": "New Task",
  "description": "Task description",
  "priority": "HIGH",
  "dueDate": "2024-12-31",
  "assignedTo": 3
}

# Update task
PUT /api/tasks/:id
{
  "status": "IN_PROGRESS"
}

# Delete task (ADMIN)
DELETE /api/tasks/:id
```

### Dashboard

```bash
# Get dashboard statistics (ADMIN, MANAGER)
GET /api/dashboard

# Get chart data (ADMIN, MANAGER)
GET /api/dashboard/charts
```

## 🧪 Testing

See [TESTING.md](./TESTING.md) for comprehensive testing guide.

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

### Quick Deploy

```bash
# Backend
cd backend
npm run build
pm2 start src/server.js --name "task-crm-backend"

# Frontend
cd frontend
npm run build
# Copy dist/ to your web server
```

## 📊 Database Schema

### User Model
```prisma
model User {
  id            Int      @id @default(autoincrement())
  name          String
  email         String   @unique
  password      String
  role          Role     @default(EMPLOYEE)
  createdTasks  Task[]   @relation("CreatedTasks")
  assignedTasks Task[]   @relation("AssignedTasks")
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### Task Model
```prisma
model Task {
  id          Int        @id @default(autoincrement())
  title       String
  description String?
  status      TaskStatus @default(TODO)
  priority    Priority   @default(MEDIUM)
  dueDate     DateTime?
  assignedTo  Int?
  createdBy   Int
  assignee    User?      @relation("AssignedTasks", fields: [assignedTo], references: [id])
  creator     User       @relation("CreatedTasks", fields: [createdBy], references: [id])
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

## 🔒 Security Features

- ✅ JWT token authentication
- ✅ bcrypt password hashing (10 rounds)
- ✅ Role-based access control
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS protection (React)
- ✅ CORS configuration
- ✅ Input validation
- ✅ Environment variable management
- ✅ Password never returned in responses
- ✅ Secure HTTP headers

## 📝 Scripts

### Backend

```bash
npm run dev          # Start development server
npm start            # Start production server
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
npm run prisma:seed      # Seed database
```

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 📞 Support

For support, email support@yourcompany.com or join our Slack channel.

## 🗺️ Roadmap

- [ ] Email notifications
- [ ] File attachments
- [ ] Task comments
- [ ] Activity logs
- [ ] Advanced reporting
- [ ] Mobile app
- [ ] API rate limiting
- [ ] Two-factor authentication

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: 2024

Made with ❤️ by Your Team
