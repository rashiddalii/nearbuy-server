const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const reviewController = require('../controllers/reviewController');

// Create a review
router.post('/', authMiddleware, reviewController.createReview);
// Get all reviews for a user
router.get('/user/:userId', reviewController.getUserReviews);
// Get all reviews for a product
router.get('/product/:productId', reviewController.getProductReviews);

module.exports = router;
