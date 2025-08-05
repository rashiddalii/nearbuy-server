const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const cloudinary = require("../config/cloudinary");

// @desc    Upload product image to Cloudinary
// @route   POST /api/products/upload-image
// @access  Private
router.post("/upload-image", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }
    // Upload to Cloudinary
    const streamifier = require("streamifier");
    let responded = false;
    const stream = cloudinary.uploader.upload_stream({
      folder: "nearbuy/products",
      resource_type: "image"
    }, (error, result) => {
      if (responded) return;
      responded = true;
      if (error) return res.status(500).json({ message: "Cloudinary upload failed", error });
      res.json({ url: result.secure_url });
    });
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (error) {
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
});

// @desc    Get all products (public)
// @route   GET /api/products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { search, category, sort, limit = 20, page = 1 } = req.query;
    
    // Build query
    let query = { status: 'active' };
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Build sort object
    let sortObj = { createdAt: -1 }; // Default: newest first
    if (sort === 'price-low') sortObj = { price: 1 };
    if (sort === 'price-high') sortObj = { price: -1 };
    if (sort === 'oldest') sortObj = { createdAt: 1 };
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await Product.find(query)
      .populate('seller', 'name')
      .sort(sortObj)
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        hasNext: skip + products.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name email');
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Increment views
    product.views += 1;
    await product.save();
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, price, category, condition, images, location } = req.body;
    
    const product = new Product({
      title,
      description,
      price,
      category,
      condition,
      images: images || [],
      location,
      seller: req.user.id
    });
    
    const savedProduct = await product.save();
    const populatedProduct = await Product.findById(savedProduct._id)
      .populate('seller', 'name');
    
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (seller only)
router.put("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Check if user is the seller
    if (product.seller.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('seller', 'name');
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (seller only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Check if user is the seller
    if (product.seller.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Get user's products
// @route   GET /api/products/user/my-listings
// @access  Private
router.get("/user/my-listings", protect, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id })
      .populate('seller', 'name')
      .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @desc    Update product status
// @route   PATCH /api/products/:id/status
// @access  Private (seller only)
router.patch("/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Check if user is the seller
    if (product.seller.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    
    product.status = status;
    const updatedProduct = await product.save();
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router; 