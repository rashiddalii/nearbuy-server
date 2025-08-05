const Chat = require('../models/Chat');
const Message = require('../models/Message');

// Get or create a chat between two users for a product
exports.getOrCreateChat = async (req, res) => {
  const { userId, productId } = req.body;
  const members = [req.user.id, userId];
  try {
    let chat = await Chat.findOne({ members: { $all: members }, product: productId });
    if (!chat) {
      chat = await Chat.create({ members, product: productId });
    }
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all chats for the logged-in user
exports.getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({ members: req.user.id }).populate('members', 'name').populate('product', 'title images');
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
