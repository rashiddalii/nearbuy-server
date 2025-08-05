const { body } = require("express-validator");

exports.registerValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 3 }).withMessage("Name must be at least 5 characters")
    .matches(/^[A-Za-z\s]+$/).withMessage("Name must contain only letters and spaces"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email")
    .isLength({ min: 11 }).withMessage("Email must be at least 11 characters"),

  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/).withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&#+^_=<>]/).withMessage("Password must contain at least one special character"),
];
