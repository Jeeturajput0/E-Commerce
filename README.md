# 🛒 Multi-Vendor E-Commerce Platform

<p align="center">
  <img src="https://img.shields.io/badge/React.js-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

<p align="center">
  <strong>A fully functional Multi-Vendor E-Commerce Platform with Admin, Vendor and Customer dashboards.</strong>
</p>

---

## 🚀 Project Overview

This is a **full-stack Multi-Vendor E-Commerce platform** where multiple vendors can manage their products and orders while customers can browse products, add items to cart, place orders and manage their accounts.

The platform contains three major dashboards:

* 👑 **Admin Dashboard**
* 🏪 **Vendor Dashboard**
* 🛍️ **Customer Dashboard**

The project is designed with a modern, responsive and user-friendly interface.

---

# ✨ Main Features

## 👑 Admin Dashboard

The Admin Dashboard provides complete control over the entire e-commerce platform.

### Features

* 📊 Dashboard Analytics
* 👥 User Management
* 🏪 Vendor Management
* 📦 Product Management
* 🗂️ Category Management
* 🏷️ Brand Management
* 📏 Size Management
* 🛒 Order Management
* 💰 Sales & Revenue Overview
* 📈 Business Statistics
* 🔐 Authentication & Authorization
* ⚙️ Platform Management

Admin can monitor and manage customers, vendors, products and orders from a centralized dashboard.

---

# 🏪 Vendor Dashboard

The Vendor Dashboard allows sellers to manage their own store.

### Features

* 📊 Vendor Dashboard
* ➕ Add Products
* ✏️ Edit Products
* 🗑️ Delete Products
* 📦 Product Management
* 🏷️ Brand & Category Management
* 📏 Product Sizes
* 🛒 Order Management
* 📈 Sales Overview
* 💰 Revenue Tracking
* 👤 Vendor Profile
* 📦 Manage Inventory

Each vendor can manage their products and orders independently.

---

# 🛍️ Customer Dashboard

The Customer Dashboard provides a complete shopping experience.

### Features

* 🏠 Home Page
* 🔍 Product Search
* 🗂️ Product Categories
* 🔎 Product Filters
* 📄 Product Details
* 🛒 Shopping Cart
* ❤️ Wishlist
* 💳 Checkout
* 📦 Order Management
* 📋 Order History
* 👤 Customer Profile
* 🔐 Login & Signup
* 📱 Responsive Design

Customers can browse products, add products to their cart and place orders through the platform.

---

# 🛒 E-Commerce Features

### Product System

* Product listing
* Product details
* Product images
* Product categories
* Brands
* Sizes
* Product search
* Product filtering
* Product management

### Shopping System

* Add to Cart
* Remove from Cart
* Update Quantity
* Wishlist
* Checkout
* Order Creation
* Order History

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Role-Based Access
* Admin Authentication
* Vendor Authentication
* Customer Authentication

---

# 🔐 Role-Based System

The application uses different roles for different users.

```text
                    E-Commerce Platform
                           │
             ┌─────────────┼─────────────┐
             │             │             │
          👑 Admin      🏪 Vendor     🛍️ Customer
             │             │             │
             ▼             ▼             ▼
        Platform       Store/Product    Shopping
        Management      Management      Experience
```

### Admin

```text
Admin
 ├── Users
 ├── Vendors
 ├── Products
 ├── Categories
 ├── Brands
 ├── Orders
 └── Analytics
```

### Vendor

```text
Vendor
 ├── Dashboard
 ├── Products
 ├── Categories
 ├── Brands
 ├── Orders
 ├── Sales
 └── Profile
```

### Customer

```text
Customer
 ├── Home
 ├── Products
 ├── Cart
 ├── Wishlist
 ├── Checkout
 ├── Orders
 └── Profile
```

---

# 🧑‍💻 Technology Stack

## Frontend

* React.js
* JavaScript
* Tailwind CSS
* React Router DOM
* Framer Motion
* Axios
* Lucide React
* Vite

## Backend

* Node.js
* Express.js
* REST API
* JWT Authentication
* Mongoose

## Database

* MongoDB

## Development Tools

* Git
* GitHub
* VS Code
* Postman
* npm

---

# 🎨 UI/UX

The application focuses on a modern and premium user experience.

### Design Features

* ✨ Modern UI
* 📱 Fully Responsive
* 🎨 Clean Layout
* 🧊 Glassmorphism Elements
* 🔄 Smooth Animations
* 🖱️ Interactive Hover Effects
* 📊 Modern Dashboard Components
* 🌙 Theme Support
* 📐 Responsive Grid Layout

---

# 📁 Project Structure

```text
multi-vendor-ecommerce/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── context/
│   │   ├── redux/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── config/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🔄 Application Flow

```text
Customer
   │
   ▼
Browse Products
   │
   ▼
Product Details
   │
   ▼
Add To Cart
   │
   ▼
Checkout
   │
   ▼
Place Order
   │
   ▼
Order Management
```

Vendor:

```text
Vendor Login
    │
    ▼
Vendor Dashboard
    │
    ├── Add Product
    ├── Manage Products
    ├── Manage Orders
    └── View Sales
```

Admin:

```text
Admin Login
    │
    ▼
Admin Dashboard
    │
    ├── Manage Users
    ├── Manage Vendors
    ├── Manage Products
    ├── Manage Categories
    ├── Manage Brands
    └── Manage Orders
```

---

# 🔑 Authentication & Security

The application implements authentication using:

* JWT Tokens
* Protected Routes
* Role-Based Authorization
* Secure API Requests
* Password Authentication
* User/Vendor/Admin Access Control

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

## 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

## 4. Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
```

Add frontend environment variables if required:

```env
VITE_API_URL=your_backend_api_url
```

## 5. Start Backend

```bash
npm run dev
```

## 6. Start Frontend

```bash
npm run dev
```

---

# 🌐 Deployment

The project can be deployed using:

* Vercel
* Render
* MongoDB Atlas

---

# 📸 Screenshots

Add your project screenshots here.

```text
/screenshots
├── admin-dashboard.png
├── vendor-dashboard.png
├── customer-dashboard.png
├── products.png
├── product-details.png
├── cart.png
└── checkout.png
```

Example:

```markdown
![Admin Dashboard](./screenshots/admin-dashboard.png)

![Vendor Dashboard](./screenshots/vendor-dashboard.png)

![Customer Dashboard](./screenshots/customer-dashboard.png)
```

---

# 📊 Project Highlights

| Feature             | Status      |
| ------------------- | ----------- |
| Admin Dashboard     | ✅ Completed |
| Vendor Dashboard    | ✅ Completed |
| Customer Dashboard  | ✅ Completed |
| Authentication      | ✅ Completed |
| Product Management  | ✅ Completed |
| Category Management | ✅ Completed |
| Brand Management    | ✅ Completed |
| Cart                | ✅ Completed |
| Wishlist            | ✅ Completed |
| Orders              | ✅ Completed |
| Responsive UI       | ✅ Completed |
| REST API            | ✅ Completed |
| MongoDB Integration | ✅ Completed |

---

# 🎯 Project Goals

The main goal of this project was to build a real-world e-commerce platform that supports multiple vendors and provides separate interfaces for administrators, sellers and customers.

This project demonstrates practical experience with:

* Full-Stack Development
* React.js
* REST APIs
* MongoDB
* Authentication
* Role-Based Access
* Dashboard Development
* E-Commerce Architecture
* Responsive UI Development

---

# 👨‍💻 Developer

## Jeetu Rajput

**Frontend Developer | MERN Stack Developer**

I build modern, responsive and scalable web applications using React.js and the MERN stack.

### 🔗 GitHub

https://github.com/Jeeturajput0

### 🔗 Portfolio

Add your portfolio URL here.

### 🔗 LinkedIn

Add your LinkedIn URL here.

---

# ⭐ Show Your Support

If you like this project, consider giving it a ⭐ star on GitHub.

---

<p align="center">
  <strong>Built with ❤️ by Jeetu Rajput</strong>
</p>
