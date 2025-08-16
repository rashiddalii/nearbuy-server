# 🚀 NearBuy Backend API - Community Marketplace

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.5-green.svg)](https://mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-orange.svg)](https://socket.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **The robust backend API powering NearBuy - A community marketplace where neighbors buy, sell, and connect safely through real-time communication.**

## 📖 Overview

NearBuy Backend is a powerful Node.js/Express API that serves as the backbone for a community marketplace platform. It provides secure authentication, real-time messaging, product management, and file upload capabilities. Built with modern web technologies, it enables seamless communication between buyers and sellers while maintaining data integrity and security.

### 🎯 What This Backend Powers

- **Community Marketplace**: RESTful API for product listings, user management, and transactions
- **Real-time Communication**: Socket.io integration for instant messaging between users
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **File Management**: Cloudinary integration for secure image uploads and storage
- **Data Persistence**: MongoDB database with Mongoose ODM for reliable data management

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration**: Secure user registration with email validation
- **JWT Authentication**: Token-based authentication for API access
- **Password Security**: bcrypt hashing for secure password storage
- **Protected Routes**: Middleware-based route protection
- **User Profiles**: Complete user profile management

### 🛒 Product Management
- **CRUD Operations**: Full Create, Read, Update, Delete for products
- **Search & Filtering**: Advanced search with text indexing and category filtering
- **Pagination**: Efficient pagination for large product catalogs
- **Image Upload**: Cloudinary integration for product images
- **Status Management**: Product status tracking (active, sold, inactive, draft)

### 💬 Real-time Communication
- **Socket.io Integration**: Real-time bidirectional communication
- **Chat Management**: Create and manage conversations between users
- **Message Handling**: Send, receive, and track message delivery
- **Read Receipts**: Message read status tracking
- **Chat Rooms**: Organized chat rooms for product-specific conversations

### 📊 User Management
- **User Profiles**: Comprehensive user profile system
- **Dashboard Data**: User statistics and activity tracking
- **Saved Items**: Bookmark and manage favorite products
- **User Stats**: Analytics and user activity metrics

### 🔒 Security & Validation
- **Input Validation**: Express-validator for request validation
- **CORS Protection**: Cross-origin resource sharing configuration
- **File Upload Security**: Secure file handling with size and type restrictions
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Tech Stack

### Core Framework
- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **MongoDB 8.16.5** - NoSQL database
- **Mongoose 8.16.5** - MongoDB object modeling

### Authentication & Security
- **JWT (jsonwebtoken 9.0.2)** - JSON Web Token authentication
- **bcryptjs 3.0.2** - Password hashing and verification
- **express-validator 7.2.1** - Input validation and sanitization

### Real-time Communication
- **Socket.io 4.8.1** - Real-time bidirectional communication
- **HTTP Server** - Custom HTTP server for Socket.io integration

### File Management
- **Cloudinary 2.7.0** - Cloud image and video management
- **Multer 2.0.2** - File upload middleware
- **Streamifier 0.1.1** - Stream handling for file uploads

### Development & Utilities
- **dotenv 17.2.1** - Environment variable management
- **CORS 2.8.5** - Cross-origin resource sharing
- **Nodemon 3.1.10** - Development server with auto-restart

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)

### Step 1: Clone the Repository
```bash
git clone https://github.com/rashidd_alii/nearbuy-server.git
cd nearbuy-server
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Setup
Create a `.env` file in the server directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/nearbuy
# or for cloud MongoDB
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nearbuy

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Step 4: Start the Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will be running at `http://localhost:5000`

### Available Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (if configured)

## 📱 Usage

### Testing the API

#### 1. **Using Postman/Insomnia**
Import the following endpoints into your API testing tool:

**Base URL**: `http://localhost:5000/api`

#### 2. **Using cURL**

**Test Server Health:**
```bash
curl http://localhost:5000/
# Response: "API is running"
```

**Register a New User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@gmail.com",
    "password": "password123"
  }'
```

**Login User:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@gmail.com",
    "password": "password123"
  }'
```

**Get All Products:**
```bash
curl http://localhost:5000/api/products
```

**Create a Product (with auth token):**
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "iPhone 12",
    "description": "Excellent condition iPhone 12",
    "price": 500,
    "category": "Electronics",
    "condition": "excellent",
    "location": "New York"
  }'
```

### Key API Endpoints to Test

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

#### Products
- `GET /api/products` - Get all products (with search/filter)
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

#### Messaging
- `POST /api/chats/get-or-create` - Create or get chat
- `GET /api/chats/my` - Get user's chats
- `GET /api/messages/:chatId` - Get chat messages
- `POST /api/messages/:chatId` - Send message

## 🌐 Deployment

### Render Deployment
This backend is deployed on Render and accessible at:
**Live API**: `https://nearbuy-server-j5wo.onrender.com`

### Environment Variables for Production
```env
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Deployment Steps
1. **Connect Repository**: Link your GitHub repository to Render
2. **Set Environment Variables**: Configure all required environment variables
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Deploy**: Render will automatically build and deploy your application

## 📚 API Documentation

### Authentication Endpoints

#### `POST /api/auth/register`
Register a new user account.
```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "password123"
}
```

#### `POST /api/auth/login`
Authenticate user and receive JWT token.
```json
{
  "email": "john@gmail.com",
  "password": "password123"
}
```

### Product Endpoints

#### `GET /api/products`
Get all products with optional filters.
**Query Parameters:**
- `search` - Text search in title/description
- `category` - Filter by category
- `sort` - Sort by price, date (price-low, price-high, newest, oldest)
- `limit` - Items per page (default: 20)
- `page` - Page number (default: 1)

#### `POST /api/products`
Create a new product (requires authentication).
```json
{
  "title": "Product Title",
  "description": "Product description",
  "price": 100,
  "category": "Electronics",
  "condition": "excellent",
  "location": "City, State",
  "images": ["image_url1", "image_url2"]
}
```

### Messaging Endpoints

#### `POST /api/chats/get-or-create`
Create or retrieve a chat between users.
```json
{
  "userId": "user_id_to_chat_with",
  "productId": "product_id_for_context"
}
```

#### `POST /api/messages/:chatId`
Send a message in a chat.
```json
{
  "text": "Hello! Is this item still available?"
}
```

### Socket.io Events

#### Client to Server
- `join` - Join a chat room
- `sendMessage` - Send a message
- `markAsRead` - Mark messages as read
- `leave` - Leave a chat room

#### Server to Client
- `receiveMessage` - Receive a new message
- `messagesRead` - Message read status update

## 🤝 Contributing

We welcome contributions to make NearBuy Backend even more robust and feature-rich! Whether you're fixing bugs, adding new endpoints, or improving performance, your contributions are valuable.

### How to Contribute
1. **Fork** this repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make Changes**: Follow the existing code style and conventions
4. **Test**: Ensure all endpoints work correctly
5. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
6. **Push** to the branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

### Development Guidelines
- Follow Node.js and Express.js best practices
- Use proper error handling and validation
- Add appropriate JSDoc comments for new endpoints
- Ensure all new features are properly tested
- Follow the existing API response format

### Areas for Contribution
- 🐛 Bug fixes and performance improvements
- ✨ New API endpoints and features
- 🔒 Security enhancements and validation
- 📊 Analytics and monitoring
- 🧪 Testing and quality assurance
- 📚 API documentation improvements
- 🌍 Internationalization support
- 🔍 Search and filtering enhancements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🔗 Frontend Repository

This backend API powers the NearBuy frontend application. For the complete full-stack experience:

**Frontend Repository**: [NearBuy Frontend](https://github.com/rashidd_alii/nearbuy-client)

The frontend provides:
- React-based user interface
- Real-time chat integration
- Product browsing and management
- User authentication and profiles
- Responsive design for all devices

## 🙏 Acknowledgments

- **Express.js Team** for the amazing web framework
- **MongoDB Team** for the flexible database solution
- **Socket.io Team** for real-time communication capabilities
- **Cloudinary Team** for image management services
- **Mongoose Team** for MongoDB object modeling

## 📞 Support

If you have any questions or need help:
- 📧 Email: mrashidali7540@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/rashidd_alii/nearbuy-server/issues)

---

**Made with ❤️ by the NearBuy Community**

*Building stronger communities, one transaction at a time.*
