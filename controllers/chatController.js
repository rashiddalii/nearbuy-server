const Chat = require('../models/Chat');
const Message = require('../models/Message');

// Get or create a chat between two users for a product
exports.getOrCreateChat = async (req, res) => {
  const { userId, productId } = req.body;
  
  // Ensure we don't create a chat with the same user
  if (req.user.id === userId) {
    return res.status(400).json({ message: 'Cannot create chat with yourself' });
  }
  
  const members = [req.user.id, userId];
  try {
    // Find existing chat with exactly these members and product
    let chat = await Chat.findOne({ 
      members: { $all: members, $size: 2 }, 
      product: productId 
    });
    
    if (!chat) {
      chat = await Chat.create({ members, product: productId });
    }
    
    // Populate the chat with member and product info
    await chat.populate('members', 'name');
    await chat.populate('product', 'title images');
    
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all chats for the logged-in user
exports.getUserChats = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    
    // Find all chats where the current user is a member
    const chats = await Chat.find({ members: currentUserId })
      .populate('members', 'name')
      .populate('product', 'title images');
    
    // Get messages for each chat to calculate unread counts
    const chatsWithMessages = await Promise.all(
      chats.map(async (chat) => {
        const messages = await Message.find({ chat: chat._id })
          .populate('sender', 'name')
          .sort({ createdAt: -1 })
          .limit(10); // Get last 10 messages
        
        const chatObj = chat.toObject();
        chatObj.messages = messages;
        
        // Add a helper field to identify the other user
        const otherUser = chat.members.find(member => member._id.toString() !== currentUserId);
        chatObj.otherUser = otherUser;
        
        return chatObj;
      })
    );
    
    res.json(chatsWithMessages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
