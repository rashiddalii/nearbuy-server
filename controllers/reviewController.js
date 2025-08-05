const Review = require('../models/Review');

// Create a review
exports.createReview = async (req, res) => {
  try {
    const { reviewee, product, rating, comment } = req.body;
    const reviewer = req.user.id;
    const review = await Review.create({ reviewer, reviewee, product, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get reviews for a user
exports.getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ reviewee: userId }).populate('reviewer', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate('reviewer', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
