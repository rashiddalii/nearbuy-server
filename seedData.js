const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const sampleProducts = [
  {
    title: "iPhone 13 Pro - Excellent Condition",
    description: "Selling my iPhone 13 Pro in excellent condition. 256GB, Pacific Blue. Includes original box and charger. No scratches or damage. Perfect for anyone looking for a high-quality smartphone at a great price.",
    price: 799,
    category: "Electronics",
    condition: "excellent",
    location: "Downtown, City",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"
    ],
    views: 45,
    saves: 8
  },
  {
    title: "Vintage Leather Jacket",
    description: "Beautiful vintage leather jacket from the 80s. Size M, perfect condition. Classic design that never goes out of style. Perfect for motorcycle enthusiasts or fashion lovers.",
    price: 150,
    category: "Fashion",
    condition: "good",
    location: "Midtown, City",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop"
    ],
    views: 23,
    saves: 3
  },
  {
    title: "Coffee Table - Modern Design",
    description: "Beautiful modern coffee table made of solid wood. Perfect for living room. Clean lines and contemporary design. Measures 48\" x 24\" x 18\".",
    price: 120,
    category: "Furniture",
    condition: "good",
    location: "Uptown, City",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    ],
    views: 12,
    saves: 2
  },
  {
    title: "Nike Air Jordan 1 Retro",
    description: "Classic Nike Air Jordan 1 Retro in Chicago colorway. Size 10, excellent condition. Only worn a few times. Includes original box.",
    price: 250,
    category: "Fashion",
    condition: "excellent",
    location: "Downtown, City",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop"
    ],
    views: 67,
    saves: 15
  },
  {
    title: "MacBook Pro 2021",
    description: "MacBook Pro 2021 with M1 Pro chip. 16GB RAM, 512GB SSD. Perfect condition, barely used. Includes charger and original box.",
    price: 1800,
    category: "Electronics",
    condition: "excellent",
    location: "Tech District, City",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop"
    ],
    views: 89,
    saves: 22
  },
  {
    title: "Guitar - Fender Stratocaster",
    description: "Fender Stratocaster electric guitar. Great condition, excellent sound. Perfect for beginners or experienced players. Includes case.",
    price: 400,
    category: "Music",
    condition: "good",
    location: "Arts District, City",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    ],
    views: 34,
    saves: 7
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get a user to assign as seller (assuming you have at least one user)
    const user = await User.findOne();
    if (!user) {
      console.log('No users found. Please create a user first.');
      return;
    }

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Add seller ID to products
    const productsWithSeller = sampleProducts.map(product => ({
      ...product,
      seller: user._id
    }));

    // Insert sample products
    const insertedProducts = await Product.insertMany(productsWithSeller);
    console.log(`Inserted ${insertedProducts.length} sample products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 