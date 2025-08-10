const Message = require('../models/Message');
const Chat = require('../models/Chat');

// Get all messages for a chat
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId }).populate('sender', 'name');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Send a message in a chat
exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const message = await Message.create({
      chat: req.params.chatId,
      sender: req.user.id,
      text
    });
    
    // Populate sender info
    await message.populate('sender', 'name');
    
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Mark messages as read
exports.markAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;

    // Mark all unread messages in this chat as read (except sender's own messages)
    await Message.updateMany(
      { 
        chat: chatId, 
        sender: { $ne: userId }, 
        read: false 
      },
      { read: true }
    );

    res.json({ message: 'Messages marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get unread message count for a user
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get all chats where user is a member
    const userChats = await Chat.find({ members: userId });
    const chatIds = userChats.map(chat => chat._id);
    
    // Count unread messages (excluding user's own messages)
    const unreadCount = await Message.countDocuments({
      chat: { $in: chatIds },
      sender: { $ne: userId },
      read: false
    });

    res.json({ unreadCount });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
