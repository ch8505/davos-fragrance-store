# Davos Fragrance Store

A full-stack e-commerce application for a fragrance and diffuser store built with React and Node.js/Express.

## Overview

Davos Fragrance Store is a complete e-commerce application for an online fragrance and diffuser store. The system supports user registration and authentication, product management with an admin interface, and a full shopping cart functionality.

## Key Features

- User registration and login with JWT authentication
- Product management (add, update, delete) with admin interface
- Shopping cart with total price calculation
- Filter products by category
- Role-based access control (User/Admin)
- Responsive UI with PrimeReact components

## Tech Stack

**Frontend:**
- React 19.1.0
- Redux Toolkit 2.8.2
- React Router DOM 7.6.2
- PrimeReact 10.9.6
- Axios 1.9.0
- Styled Components 6.1.18

**Backend:**
- Express.js 5.1.0
- MongoDB + Mongoose 8.15.1
- JWT 9.0.2
- Bcrypt 6.0.0
- CORS 2.8.5

## Project Structure

```
client/
├── src/
│   ├── Componenents/
│   │   ├── HomePage.jsx
│   │   ├── Auth/ (Login, Register, LogOut)
│   │   ├── products/ (ProdList, SingleProduct, ProductManage)
│   │   ├── ShoppingCart/
│   │   ├── PublicCmp/ (Header, Footer)
│   │   └── Sharred/ (Layout)
│   ├── store/ (Redux store)
│   └── css/

server/
├── config/ (corsOptions, dbConn)
├── controllers/ (authController, cartController, productController)
├── middleware/ (verifyJWT, verifyAdmin)
├── models/ (User, Product, Cart)
└── routes/ (authRoutes, product, cartRoutes)
```

## Installation & Setup

### Prerequisites
- Node.js 14+
- MongoDB

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ch8505/git-node-session.git
   cd davos-fragrance-store
   ```

2. **Install Server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Set up environment variables (.env)**
   ```
   PORT=5000
   DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/dbname
   ACCESS_TOKEN_SECRET=your_secret_key
   ```

4. **Install Client dependencies**
   ```bash
   cd ../client
   npm install
   ```

5. **Start the Server**
   ```bash
   cd server
   npm run dev
   ```
   Server runs at http://localhost:5000

6. **Start the Client**
   ```bash
   cd client
   npm start
   ```
   Application opens at http://localhost:3000

## API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
```

### Products
```
GET    /api/product          - Get all products
GET    /api/product/:id      - Get specific product
POST   /api/product          - Add product (Admin only)
PUT    /api/product/:id      - Update product (Admin only)
DELETE /api/product/:id      - Delete product (Admin only)
```

### Shopping Cart (requires JWT)
```
GET    /api/cart             - Get user's cart
POST   /api/cart             - Add product to cart
DELETE /api/cart/:id         - Remove from cart
```

## User Roles

- **User**: Regular user - browse products and manage cart
- **Admin**: Store manager - manage products + all user features

## Security Features

- JWT Token Authentication for protected requests
- Password Hashing with bcrypt
- Role-Based Access Control
- CORS Protection
- Environment Variables for sensitive data

## Product Categories

1. Stick Diffusers
2. Spray Diffusers
3. Electric Devices
4. Scent Packaging

## License

ISC License
