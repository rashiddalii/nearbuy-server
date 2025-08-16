const SavedItem = require('../models/SavedItem');
const Product = require('../models/Product');

// Save a product
const saveProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if already saved
    const existingSave = await SavedItem.findOne({ user: userId, product: productId });
    if (existingSave) {
      return res.status(400).json({ message: 'Product already saved' });
    }

    // Create saved item
    const savedItem = new SavedItem({
      user: userId,
      product: productId
    });

    await savedItem.save();

    // Update product saves count
    await Product.findByIdAndUpdate(productId, { $inc: { saves: 1 } });

    res.status(201).json({ message: 'Product saved successfully' });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Unsave a product
const unsaveProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    // Find and delete saved item
    const savedItem = await SavedItem.findOneAndDelete({ user: userId, product: productId });
    
    if (!savedItem) {
      return res.status(404).json({ message: 'Saved item not found' });
    }

    // Update product saves count
    await Product.findByIdAndUpdate(productId, { $inc: { saves: -1 } });

    res.json({ message: 'Product unsaved successfully' });
  } catch (error) {
    console.error('Error unsaving product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user's saved items
const getSavedItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const savedItems = await SavedItem.find({ user: userId })
      .populate({
        path: 'product',
        populate: {
          path: 'seller',
          select: 'name avatar'
        }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await SavedItem.countDocuments({ user: userId });

    res.json({
      savedItems: savedItems.map(item => item.product).filter(Boolean),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching saved items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Check if a product is saved by current user
const checkIfSaved = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const savedItem = await SavedItem.findOne({ user: userId, product: productId });
    
    res.json({ isSaved: !!savedItem });
  } catch (error) {
    console.error('Error checking saved status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get saved items count for dashboard
const getSavedItemsCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await SavedItem.countDocuments({ user: userId });
    
    res.json({ count });
  } catch (error) {
    console.error('Error fetching saved items count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  saveProduct,
  unsaveProduct,
  getSavedItems,
  checkIfSaved,
  getSavedItemsCount
};
