const User = require("../models/User");
const Product = require("../models/Product");

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    // Find user by ID from JWT token, exclude password
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        avatar: user.avatar || "👤",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// @desc    Get user stats
// @route   GET /api/users/stats
// @access  Private
const getUserStats = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's products
    const products = await Product.find({ seller: userId });
    
    // Calculate stats
    const activeListings = products.filter(p => p.status === 'active').length;
    const soldItems = products.filter(p => p.status === 'sold').length;
    const totalViews = products.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalSaves = products.reduce((sum, p) => sum + (p.saves || 0), 0);
    
    // Calculate average rating (placeholder for now)
    const averageRating = products.length > 0 ? 
      products.reduce((sum, p) => sum + (p.averageRating || 0), 0) / products.length : 0;
    
    const totalReviews = products.reduce((sum, p) => sum + (p.numReviews || 0), 0);

    res.json({
      success: true,
      data: {
        activeListings,
        soldItems,
        totalViews,
        totalSaves,
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        totalReviews
      }
    });
  } catch (error) {
    console.error("Get User Stats Error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

module.exports = {
  getUserProfile,
  getUserStats
};