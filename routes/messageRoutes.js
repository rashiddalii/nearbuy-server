const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const messageController = require('../controllers/messageController');

// Get all messages for a chat
router.get('/:chatId', auth, messageController.getMessages);
// Send a message in a chat
router.post('/:chatId', auth, messageController.sendMessage);

module.exports = router;
