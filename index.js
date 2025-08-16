const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});





app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", userRoutes);
// app.use("/api/reviews", require("./routes/reviewRoutes")); // Temporarily disabled - review system needs fixing
app.use("/api/chats", require("./routes/chatRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/saved-items", require("./routes/savedItemRoutes"));

const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);


// Connect DB & start server
connectDB();


const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Join a chat room
  socket.on('join', (chatId) => {
    console.log(`User ${socket.id} joining chat: ${chatId}`);
    socket.join(chatId);
  });

  // Handle sending a message
  socket.on('sendMessage', ({ chatId, message }) => {
    console.log(`Message sent to chat ${chatId}:`, message);
    // Broadcast to all users in the chat room except the sender
    socket.to(chatId).emit('receiveMessage', message);
  });

  // Handle marking messages as read
  socket.on('markAsRead', ({ chatId, messageIds }) => {
    console.log(`Messages marked as read in chat ${chatId}:`, messageIds);
    // Broadcast read status to all users in the chat room
    socket.to(chatId).emit('messagesRead', { chatId, messageIds });
  });

  // Handle leaving a chat room
  socket.on('leave', (chatId) => {
    console.log(`User ${socket.id} leaving chat: ${chatId}`);
    socket.leave(chatId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.get("/testdb", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({ collections });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
