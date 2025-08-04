const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getDashboard } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const { registerValidation } = require("../middleware/valiadtionMiddleware");




router.post("/register", registerValidation, registerUser);
router.post("/login", loginUser);
// router.get("/dashboard", authMiddleware, getDashboard);

module.exports = router;
