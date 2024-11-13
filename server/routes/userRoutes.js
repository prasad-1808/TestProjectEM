const express = require("express");
const {
  createUser,
  loginUser,
  findUserByMobileNumber,
  findUserById,
  editUser,
} = require("../controllers/userController");

const router = express.Router();

// User routes
router.post("/register", createUser); // Create a new user
router.post("/login", loginUser); // Log in a user
router.put("/edit/:userId", editUser); // Edit a user

// Routes for finding users
router.get("/mobile/:mobileNumber", findUserByMobileNumber);
router.get("/id/:userId", findUserById);

module.exports = router;
