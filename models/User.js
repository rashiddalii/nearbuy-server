const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      minlength: [11, "Email must be at least 11 characters"],
      match: [
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
        "Please enter a valid Gmail address",
      ],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },

    phone: { type: String, default: "" },

  location: { type: String, default: "" },

  bio: { type: String, default: "" },
  
  avatar: { type: String, default: "👤" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
