# Task Management CRM - Production Deployment Guide

## 🚀 Production Deployment

Bu qo'llanma Task Management CRM loyihasini production muhitiga joylashtirish uchun mo'ljallangan.

---

## 📋 Prerequisites

### Server Requirements
- **Node.js**: 18+ LTS
- **PostgreSQL**: 14+
- **RAM**: 2GB minimum (4GB recommended)
- **Storage**: 10GB minimum
- **OS**: Linux (Ubuntu 20.04+ recommended)

### Domain & SSL
- Domain name (e.g., crm.yourcompany.com)
- SSL certificate (Let's Encrypt recommended)

---

## 🔧 Backend Deployment

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install PM2 (Process Manager)
sudo npm install -g pm2
```

### 2. PostgreSQL Configuration

```bash
# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql

# In PostgreSQL shell:
CREATE DATABASE task_manager;
CREATE USER crm_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE task_manager TO crm_user;
\q
```

### 3. Clone & Setup Backend

```bash
# Clone repository
git clone <your-repo-url>
cd task-management-crm/backend

# Install dependencies
npm install --production

# Create .env file
nano .env
```

**.env file:**
```env
# Database
DATABASE_URL="postgresql://crm_user:your_secure_password@localhost:5432/task_manager"

# JWT
JWT_SECRET="your_super_secret_jwt_key_min_32_chars"
JWT_EXPIRES_IN="7d"

# Server
PORT=5000
NODE_ENV="production"

# CORS
FRONTEND_URL="https://crm.yourcompany.com"
```

### 4. Database Migration

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database (optional, for initial data)
npx prisma db seed
```

### 5. Start with PM2

```bash
# Start application
pm2 start src/server.js --name "task-crm-backend"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 6. Nginx Configuration

```bash
# Install Nginx
sudo apt install -y nginx

# Create config
sudo nano /etc/nginx/sites-available/task-crm-backend
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name api.crm.yourcompany.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/task-crm-backend /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 7. SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d api.crm.yourcompany.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 🎨 Frontend Deployment

### 1. Build Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
nano .env
```

**.env file:**
```env
VITE_API_URL=https://api.crm.yourcompany.com/api
```

```bash
# Build for production
npm run build
```

### 2. Deploy to Nginx

```bash
# Copy build files
sudo cp -r dist/* /var/www/html/

# Create Nginx config
sudo nano /etc/nginx/sites-available/task-crm-frontend
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name crm.yourcompany.com;
    root /var/www/html;
    index index.html;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/task-crm-frontend /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Get SSL certificate
sudo certbot --nginx -d crm.yourcompany.com
```

---

## 🔒 Security Checklist

### Backend Security
- [ ] Change default JWT_SECRET to strong random string (min 32 chars)
- [ ] Use strong PostgreSQL password
- [ ] Enable HTTPS/SSL for all endpoints
- [ ] Set NODE_ENV to "production"
- [ ] Configure CORS to allow only frontend domain
- [ ] Enable rate limiting (optional, add express-rate-limit)
- [ ] Setup firewall (UFW)
- [ ] Disable root SSH login
- [ ] Use SSH keys instead of passwords
- [ ] Regular security updates

### Database Security
- [ ] Use strong database password
- [ ] Restrict database access to localhost only
- [ ] Regular backups (daily recommended)
- [ ] Monitor slow queries
- [ ] Use connection pooling

### Frontend Security
- [ ] Enable HTTPS
- [ ] Set secure cookies (if using cookies)
- [ ] Implement Content Security Policy (CSP)
- [ ] Sanitize all user inputs
- [ ] Use HTTPS for API calls only

---

## 📊 Monitoring & Logging

### PM2 Monitoring

```bash
# View logs
pm2 logs task-crm-backend

# Monitor in real-time
pm2 monit

# Restart application
pm2 restart task-crm-backend

# Stop application
pm2 stop task-crm-backend
```

### Database Monitoring

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# View PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-14-main.log

# Check database size
psql -U crm_user -d task_manager -c "SELECT pg_size_pretty(pg_database_size('task_manager'));"
```

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

---

## 🔄 Backup Strategy

### Database Backup

```bash
# Create backup script
nano ~/backup-db.sh
```

**backup-db.sh:**
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/postgresql"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="task_manager_$DATE.sql"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create backup
sudo -u postgres pg_dump task_manager > $BACKUP_DIR/$BACKUP_FILE

# Compress backup
gzip $BACKUP_DIR/$BACKUP_FILE

# Keep only last 7 days
find $BACKUP_DIR -name "task_manager_*.sql.gz" -mtime +7 -delete

echo "Backup completed: $BACKUP_FILE.gz"
```

```bash
# Make executable
chmod +x ~/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e
```

**Add to crontab:**
```
0 2 * * * /root/backup-db.sh >> /var/log/backup.log 2>&1
```

---

## 🚀 Deployment Commands

### Quick Deploy Script

```bash
nano ~/deploy.sh
```

**deploy.sh:**
```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# Backend deployment
echo "📦 Deploying backend..."
cd /path/to/task-management-crm/backend
git pull origin main
npm install --production
npx prisma generate
npx prisma migrate deploy
pm2 restart task-crm-backend

# Frontend deployment
echo "🎨 Deploying frontend..."
cd /path/to/task-management-crm/frontend
git pull origin main
npm install
npm run build
sudo cp -r dist/* /var/www/html/

echo "✅ Deployment complete!"
```

```bash
chmod +x ~/deploy.sh
```

---

## 📈 Performance Optimization

### Backend Optimization

1. **Enable Clustering** (PM2)
```bash
pm2 start src/server.js -i max --name "task-crm-backend"
```

2. **Database Connection Pooling**
```env
# Add to .env
DATABASE_POOL_SIZE=20
```

3. **Enable Caching** (Redis - optional)
```bash
sudo apt install redis-server
npm install redis
```

### Frontend Optimization

1. **Enable Gzip** (already in Nginx config)

2. **Cache Static Assets** (already in Nginx config)

3. **Code Splitting** (already done by Vite)

4. **Image Optimization**
```bash
npm install -g sharp-cli
```

---

## 🧪 Testing Production

### Health Check

```bash
curl https://api.crm.yourcompany.com/api/health
```

### Load Testing

```bash
# Install Apache Bench
sudo apt install apache2-utils

# Test with 100 requests, 10 concurrent
ab -n 100 -c 10 https://api.crm.yourcompany.com/api/health
```

### SSL Check

```bash
# Check SSL certificate
openssl s_client -connect api.crm.yourcompany.com:443 -servername api.crm.yourcompany.com
```

---

## 🆘 Troubleshooting

### Backend Issues

```bash
# Check PM2 status
pm2 status

# View backend logs
pm2 logs task-crm-backend --lines 100

# Restart backend
pm2 restart task-crm-backend

# Check if port is in use
sudo lsof -i :5000
```

### Database Issues

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql

# Check connections
psql -U crm_user -d task_manager -c "SELECT count(*) FROM pg_stat_activity;"
```

### Frontend Issues

```bash
# Check Nginx status
sudo systemctl status nginx

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Test Nginx config
sudo nginx -t
```

---

## 📞 Support

### Useful Commands

```bash
# View all PM2 processes
pm2 list

# Monitor all processes
pm2 monit

# Save PM2 configuration
pm2 save

# Reload Nginx
sudo systemctl reload nginx

# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
top
```

---

## ✅ Pre-Launch Checklist

- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] SSL certificates installed
- [ ] Database migrated and seeded
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] Firewall configured
- [ ] Backups configured
- [ ] Monitoring setup
- [ ] Health checks passing
- [ ] Load testing completed
- [ ] Security audit completed
- [ ] Documentation updated

---

## 🎉 Production Ready!

Your Task Management CRM is now production-ready!

**Access URLs:**
- Frontend: `https://crm.yourcompany.com`
- Backend API: `https://api.crm.yourcompany.com`
- API Health: `https://api.crm.yourcompany.com/api/health`

**Demo Credentials:**
- Admin: `admin@crm.com` / `admin123`
- Manager: `manager@crm.com` / `manager123`
- Employee: `employee1@crm.com` / `employee123`

---

**Last Updated:** 2024
**Version:** 1.0.0
**Status:** ✅ Production Ready
