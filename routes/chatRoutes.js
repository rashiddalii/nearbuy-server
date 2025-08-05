const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const chatController = require('../controllers/chatController');

// Get or create a chat between two users for a product
router.post('/get-or-create', auth, chatController.getOrCreateChat);
// Get all chats for the logged-in user
router.get('/my', auth, chatController.getUserChats);

module.exports = router;
