const express = require("express");
const {
  createUser,
  loginUser,
  editUser,
} = require("../controllers/userController");

const router = express.Router();

// User routes
router.post("/register", createUser); // Create a new user
router.post("/login", loginUser); // Log in a user
router.put("/edit/:userId", editUser); // Edit a user

module.exports = router;
