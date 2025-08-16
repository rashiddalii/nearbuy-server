const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  saveProduct,
  unsaveProduct,
  getSavedItems,
  checkIfSaved,
  getSavedItemsCount
} = require('../controllers/savedItemController');

// All routes require authentication
router.use(protect);

// Get saved items count for dashboard (must come before /:productId routes)
router.get('/count', getSavedItemsCount);

// Get user's saved items
router.get('/', getSavedItems);

// Check if a product is saved by current user
router.get('/check/:productId', checkIfSaved);

// Save a product
router.post('/:productId', saveProduct);

// Unsave a product
router.delete('/:productId', unsaveProduct);

module.exports = router;
