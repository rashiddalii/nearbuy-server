const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.get("/", protect, (req, res) => {
  res.json({
    message: "Welcome to your dashboard!",
    userId: req.user.id,
  });
});

module.exports = router;
