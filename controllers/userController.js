const User = require("../models/User");

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

module.exports = {
  getUserProfile
};