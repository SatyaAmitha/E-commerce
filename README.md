# Full-Stack E-commerce Application

A modern e-commerce web application built with Next.js, Express.js, and PostgreSQL, featuring a Velora-inspired design.

## 🚀 Features

- **Frontend (Next.js 14)**
  - Modern UI with shadcn/ui components
  - Responsive design with Tailwind CSS
  - Product catalog with search and filtering
  - Shopping cart functionality
  - User authentication with modal login
  - Velora-inspired design

- **Backend (Express.js)**
  - RESTful API architecture
  - JWT-based authentication
  - PostgreSQL database with Sequelize ORM
  - Product management system
  - Secure API endpoints with rate limiting

- **Database (PostgreSQL)**
  - User management
  - Product catalog
  - Order processing (coming soon)
  - Database migrations and seeders

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd fullstackdemo
```

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Backend Setup

```bash
cd ../backend
npm install
```

### 5. Database Setup

1. Create a PostgreSQL database named `ecommerce_db`
2. Update database credentials in `backend/config.env`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=your_postgres_username
DB_PASS=your_postgres_password
```

### 6. Environment Configuration

Update the following files with your configuration:

**Backend (`backend/config.env`)**:
```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASS=password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Other Configuration
UPLOAD_DIR=uploads
```

**Frontend (`.env.local` in frontend directory)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 7. Database Initialization & Seeding

```bash
cd backend
npm run seed
```

This will:
- Create database tables
- Seed the database with sample products
- Set up initial data

## 🚀 Running the Application

### Development Mode

#### Option 1: Run Both Frontend and Backend Together (Recommended)

From the root directory:

```bash
npm run dev
```

This will start both the frontend (http://localhost:3000) and backend (http://localhost:5000) concurrently.

#### Option 2: Run Separately

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

## 📁 Project Structure

```
fullstackdemo/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   │   ├── page.tsx     # Home page
│   │   │   └── shop/        # Shop page
│   │   ├── components/      # React components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── layout/      # Layout components
│   │   │   └── features/    # Feature components
│   │   └── services/        # API service functions
│   │       ├── api.ts       # Base API configuration
│   │       ├── auth.ts      # Authentication services
│   │       └── products.ts  # Product services
│   └── package.json
│
├── backend/                 # Express.js backend application
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Database models
│   │   │   ├── User.js      # User model
│   │   │   └── Product.js   # Product model
│   │   ├── routes/          # API routes
│   │   │   ├── auth.js      # Authentication routes
│   │   │   ├── products.js  # Product routes
│   │   │   └── orders.js    # Order routes
│   │   ├── services/        # Business logic
│   │   │   ├── auth.js      # Authentication service
│   │   │   └── products.js  # Product service
│   │   ├── middleware/      # Custom middleware
│   │   ├── seeders/         # Database seeders
│   │   └── index.js         # Main server file
│   └── package.json
│
└── package.json             # Root package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### Products
- `GET /api/products` - Get all products (with pagination, filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get product categories
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Health Check
- `GET /api/health` - Server health check

## 🎨 Design Features

- **Velora-inspired Design**: Clean, modern e-commerce interface
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Modal Login**: Elegant login modal similar to Velora
- **Product Grid**: Beautiful product showcase with hover effects
- **Navigation**: Intuitive navigation with shopping cart integration
- **Hero Section**: Compelling hero section with call-to-action

## 🔐 Authentication

The application uses JWT-based authentication:
- Secure password hashing with bcrypt
- Token-based authentication
- Protected routes for admin functionality
- Automatic token refresh

## 📊 Database Schema

### Users Table
- id (Primary Key)
- name
- email (Unique)
- password (Hashed)
- role (user/admin)
- isActive
- timestamps

### Products Table
- id (Primary Key)
- name
- description
- price
- originalPrice
- image
- category
- inStock
- stockQuantity
- featured
- timestamps

## 🛡️ Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection

## 🚧 Coming Soon

- Shopping cart functionality
- Order processing
- Payment integration
- User profiles
- Admin dashboard
- Product reviews
- Email notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL is running
   - Check database credentials in config.env
   - Verify database exists

2. **Port Already in Use**
   - Change PORT in backend/config.env
   - Kill existing processes on ports 3000/5000

3. **Module Not Found**
   - Run `npm install` in both frontend and backend directories
   - Clear node_modules and reinstall if needed

4. **CORS Issues**
   - Check FRONTEND_URL in backend/config.env
   - Ensure frontend is running on correct port

## 📞 Support

For support, please create an issue in the repository or contact the development team.

---

**Happy Coding! 🚀** 