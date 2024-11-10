// server/routes/eventRoutes.js

const express = require("express");
const { createEvent } = require("../controllers/eventController");

const router = express.Router();

// Event routes
router.post('/events', createEvent); // Create a new event

module.exports = router