// server/routes/userRoutes.js
const express = require("express");
const { createUser } = require("../controllers/userController");

const router = express.Router();

// User routes
router.post('/users', createUser); // Create a new user

module.exports = router;