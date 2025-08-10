const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const messageController = require('../controllers/messageController');

// Get all messages for a chat
router.get('/:chatId', auth, messageController.getMessages);
// Send a message in a chat
router.post('/:chatId', auth, messageController.sendMessage);

// Mark messages as read
router.patch('/:chatId/read', auth, messageController.markAsRead);

// Get unread message count
router.get('/unread/count', auth, messageController.getUnreadCount);

module.exports = router;
