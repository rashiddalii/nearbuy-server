const mongoose = require("mongoose");

const savedItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
}, {
  timestamps: true
});

// Ensure a user can only save a product once
savedItemSchema.index({ user: 1, product: 1 }, { unique: true });

// Add indexes for better query performance
savedItemSchema.index({ user: 1 });
savedItemSchema.index({ product: 1 });

module.exports = mongoose.model("SavedItem", savedItemSchema);
