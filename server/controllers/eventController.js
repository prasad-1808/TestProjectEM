const { prisma } = require("../prismaClient.js");

// Register a new event
const eventRegister = async (req, res) => {
  const {
    userId,
    eventName,
    startDate,
    endDate,
    startTime,
    endTime,
    place,
    address,
  } = req.body;
  try {
    const event = await prisma.event.create({
      data: {
        userId,
        eventName,
        startDate,
        endDate,
        startTime,
        endTime,
        place,
        address,
      },
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Error registering event" });
  }
};

// Edit an existing event
const editEvent = async (req, res) => {
  const { eventId } = req.params;
  const { eventName, startDate, endDate, startTime, endTime, place, address } =
    req.body;
  try {
    const event = await prisma.event.update({
      where: { eventId: parseInt(eventId) },
      data: {
        eventName,
        startDate,
        endDate,
        startTime,
        endTime,
        place,
        address,
      },
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Error updating event" });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    await prisma.event.delete({
      where: { eventId: parseInt(eventId) },
    });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting event" });
  }
};

module.exports = { eventRegister, editEvent, deleteEvent };
