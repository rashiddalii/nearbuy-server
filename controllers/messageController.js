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
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
