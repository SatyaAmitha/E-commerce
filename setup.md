# Quick Setup Guide

## Prerequisites
1. Install PostgreSQL and create a database called `ecommerce_db`
2. Make sure Node.js (v18+) is installed

## Setup Steps

### 1. Install Dependencies
```bash
# Root dependencies
npm install

# Frontend dependencies
cd frontend
npm install

# Backend dependencies
cd ../backend
npm install
```

### 2. Configure Database
Update `backend/config.env` with your PostgreSQL credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=your_username
DB_PASS=your_password
```

### 3. Seed Database
```bash
cd backend
npm run seed
```

### 4. Run the Application
```bash
# From root directory
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Test the Application
1. Visit http://localhost:3000
2. Click the user icon to test the login modal
3. Visit http://localhost:3000/shop to see the product catalog
4. Backend API is available at http://localhost:5000/api

## API Endpoints
- GET /api/health - Health check
- GET /api/products - Get products
- POST /api/auth/register - Register user
- POST /api/auth/login - Login user

The application is now ready to use! 