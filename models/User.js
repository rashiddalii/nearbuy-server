const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, min: 3 },
  email: { type: String, required: true, unique: true, min: 11 },
  password: { type: String, required: true, min: 8 },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
