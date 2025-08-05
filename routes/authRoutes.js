const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile: getAuthUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { getUserStats, getUserStatsSimple } = require("../controllers/statsController");
const { getUserProfile } = require("../controllers/userController");
const { registerValidation } = require("../middleware/valiadtionMiddleware");


router.post("/register", registerValidation, registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getAuthUserProfile);
router.put("/me", authMiddleware, updateUserProfile);
router.get("/stats", authMiddleware, getUserStatsSimple);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
