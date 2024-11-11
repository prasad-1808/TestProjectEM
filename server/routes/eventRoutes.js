const express = require("express");
const {
  eventRegister,
  editEvent,
  deleteEvent,
} = require("../controllers/eventController");

const router = express.Router();

// Event routes
router.post("/events/register", eventRegister); // Register a new event
router.put("/events/:eventId", editEvent); // Edit an existing event
router.delete("/events/:eventId", deleteEvent); // Delete an event

module.exports = router;
