const express = require("express");
const {
  registerEvent,
  getUserEvents,
  getEventDataById,
} = require("../controllers/eventController");

const router = express.Router();

// Event routes
router.post("/register", registerEvent); // Register a new event
router.get("/user/:userId", getUserEvents); // Get all event IDs for a user
router.get("/:eventId", getEventDataById); // Get detailed event data by eventId

module.exports = router;
