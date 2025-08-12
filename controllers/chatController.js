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
    await chat.populate('product', 'title images price');
    
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
      .populate('product', 'title images price');
    
    // Get messages for each chat to calculate unread counts
    const chatsWithMessages = await Promise.all(
      chats.map(async (chat) => {
        const messages = await Message.find({ chat: chat._id })
          .populate('sender', 'name')
          .sort({ createdAt: 1 }); // Sort by oldest first so last message is at the end
        
        // Get the last message for display
        const lastMessage = messages.length > 0 ? messages[messages.length - 1].text : '';
        const lastMessageTime = messages.length > 0 ? messages[messages.length - 1].createdAt : chat.updatedAt;
        
        // Only keep last 10 messages for performance
        const recentMessages = messages.slice(-10);
        
        const chatObj = chat.toObject();
        chatObj.messages = recentMessages;
        chatObj.lastMessage = lastMessage;
        chatObj.lastMessageTime = lastMessageTime; // Add the timestamp of the last message
        
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
