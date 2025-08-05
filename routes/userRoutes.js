const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;