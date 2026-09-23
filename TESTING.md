# Testing Guide

## 🧪 Testing Overview

This guide covers testing for the Task Management CRM application.

---

## 1. Backend Testing

### Prerequisites

```bash
cd backend
npm install
```

### Start Backend Server

```bash
npm run dev
```

Server runs on: `http://localhost:5000`

### Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-..."
}
```

---

## 2. Authentication Testing

### Register New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

Expected response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "id": 6, "name": "Test User", "email": "test@example.com", "role": "EMPLOYEE" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@crm.com","password":"admin123"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": 1, "name": "Admin User", "email": "admin@crm.com", "role": "ADMIN" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User (requires token)

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 3. User Management Testing

### Get All Users (ADMIN/MANAGER)

```bash
curl http://localhost:5000/api/users \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Get User by ID

```bash
curl http://localhost:5000/api/users/1 \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Create User (ADMIN only)

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"New User","email":"newuser@crm.com","password":"password123","role":"EMPLOYEE"}'
```

### Update User (ADMIN only)

```bash
curl -X PUT http://localhost:5000/api/users/1 \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'
```

### Delete User (ADMIN only)

```bash
curl -X DELETE http://localhost:5000/api/users/6 \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 4. Task Management Testing

### Get All Tasks

```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Tasks with Filters

```bash
# Filter by status
curl "http://localhost:5000/api/tasks?status=TODO" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Filter by priority
curl "http://localhost:5000/api/tasks?priority=HIGH" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Search
curl "http://localhost:5000/api/tasks?search=bug" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Pagination
curl "http://localhost:5000/api/tasks?page=1&limit=5" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Multiple filters
curl "http://localhost:5000/api/tasks?status=TODO&priority=HIGH&search=fix" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Task by ID

```bash
curl http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Task (ADMIN/MANAGER)

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"New Task",
    "description":"Task description",
    "priority":"HIGH",
    "dueDate":"2024-12-31",
    "assignedTo":3
  }'
```

### Update Task

```bash
curl -X PUT http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"IN_PROGRESS"}'
```

### Delete Task (ADMIN only)

```bash
curl -X DELETE http://localhost:5000/api/tasks/1 \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 5. Dashboard Testing

### Get Dashboard Statistics (ADMIN/MANAGER)

```bash
curl http://localhost:5000/api/dashboard \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

Expected response:
```json
{
  "success": true,
  "data": {
    "stats": {
      "overview": {
        "totalUsers": 5,
        "totalEmployees": 3,
        "totalTasks": 10,
        "completionRate": 30,
        "tasksPerEmployee": 3,
        "overdueTasks": 2
      },
      "byStatus": { "todo": 4, "inProgress": 3, "completed": 3 },
      "byPriority": { "high": 3, "medium": 4, "low": 3 },
      "thisMonth": { "created": 5, "completed": 2 },
      "recentTasks": [...],
      "tasksByEmployee": [...]
    }
  }
}
```

### Get Chart Data

```bash
curl http://localhost:5000/api/dashboard/charts \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 6. Authorization Testing

### Test Role-Based Access

```bash
# EMPLOYEE trying to access users (should get 403)
curl http://localhost:5000/api/users \
  -H "Authorization: Bearer EMPLOYEE_TOKEN"

# Expected: 403 Forbidden
{
  "success": false,
  "message": "Access denied. Insufficient permissions."
}

# EMPLOYEE trying to create task (should get 403)
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer EMPLOYEE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}'

# Expected: 403 Forbidden

# EMPLOYEE can only see own tasks
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer EMPLOYEE_TOKEN"

# Returns only tasks assigned to this employee
```

---

## 7. Frontend Testing

### Start Frontend

```bash
npm run dev
```

Open: `http://localhost:5173`

### Test Login Flow

1. Navigate to `/login`
2. Enter credentials:
   - Email: `admin@crm.com`
   - Password: `admin123`
3. Click "Sign In"
4. Should redirect to `/dashboard`

### Test Dashboard

1. After login, you should see:
   - Statistics cards (Total Users, Total Tasks, etc.)
   - Task charts (by status, by priority)
   - Recent tasks list

### Test Task Management

1. Navigate to `/tasks`
2. Test search functionality
3. Test status filter
4. Test priority filter
5. Click on a task to view details
6. (ADMIN/MANAGER) Click "Create Task"
7. Fill form and submit

### Test User Management (ADMIN/MANAGER only)

1. Navigate to `/users`
2. Test search functionality
3. Test role filter
4. Click on a user to view details
5. (ADMIN only) Click "Add User"
6. Fill form and submit

### Test Profile

1. Navigate to `/profile`
2. View your profile information
3. (All users can view their own profile)

### Test Logout

1. Click user menu in header
2. Click "Logout"
3. Should redirect to `/login`

---

## 8. Error Handling Testing

### Test Invalid Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"wrong@email.com","password":"wrongpass"}'
```

Expected: 401 Unauthorized

### Test Missing Fields

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'
```

Expected: 400 Bad Request

### Test Invalid Token

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer invalid_token"
```

Expected: 401 Unauthorized

---

## 9. Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| ADMIN | admin@crm.com | admin123 |
| MANAGER | manager@crm.com | manager123 |
| EMPLOYEE | employee1@crm.com | employee123 |
| EMPLOYEE | employee2@crm.com | employee123 |
| EMPLOYEE | employee3@crm.com | employee123 |

---

## 10. Testing Checklist

### Backend
- [ ] Health check endpoint works
- [ ] Register creates new user
- [ ] Login returns JWT token
- [ ] /me returns current user
- [ ] User CRUD operations work
- [ ] Task CRUD operations work
- [ ] Task filtering works
- [ ] Task search works
- [ ] Task pagination works
- [ ] Dashboard statistics work
- [ ] Role-based access control works
- [ ] Error handling works

### Frontend
- [ ] Login page renders
- [ ] Register page renders
- [ ] Login form validates
- [ ] Register form validates
- [ ] Dashboard loads after login
- [ ] Statistics cards display
- [ ] Task list loads
- [ ] Task filtering works
- [ ] Task search works
- [ ] Task detail page works
- [ ] User list loads
- [ ] User filtering works
- [ ] User detail page works
- [ ] Profile page works
- [ ] Logout works
- [ ] Protected routes redirect to login
- [ ] Role-based routes work

---

## 11. Performance Testing

### Backend

```bash
# Test with multiple concurrent requests
# Use tools like Apache Bench (ab) or Postman

# Example with ab
ab -n 100 -c 10 http://localhost:5000/api/health
```

### Frontend

- Check browser DevTools Network tab
- Monitor load times
- Check for unnecessary re-renders
- Verify lazy loading works

---

## 12. Security Testing

### Checklist
- [ ] Passwords are hashed with bcrypt
- [ ] JWT tokens expire
- [ ] Protected routes require authentication
- [ ] Role-based access control works
- [ ] SQL injection is prevented (Prisma)
- [ ] XSS is prevented (React)
- [ ] CORS is configured correctly
- [ ] Environment variables are secure
- [ ] Password is never returned in responses

---

## 🎉 Testing Complete!

All tests should pass for a production-ready application.
