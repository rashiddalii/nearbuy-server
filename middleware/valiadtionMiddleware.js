const { body } = require("express-validator");

exports.registerValidation = [
  body("name")
    .trim()
    .not().isEmpty().withMessage("Name is required")
    .withMessage("Name must contain only letters"),

  body("email")
    .trim()
    .isEmail().withMessage("Please enter a valid email"),

  body("password")
    .trim()
    .not().isEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
];
