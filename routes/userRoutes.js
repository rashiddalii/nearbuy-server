const express = require("express");
const router = express.Router();
const { getUserProfile, getUserStats } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", authMiddleware, getUserProfile);

// @route   GET /api/users/stats
// @desc    Get user stats
// @access  Private
router.get("/stats", authMiddleware, getUserStats);

module.exports = router;