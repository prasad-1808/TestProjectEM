const { prisma } = require("../prismaClient.js");

// Register a new event with conditional fields based on eventType
const registerEvent = async (req, res) => {
  const {
    userId,
    eventType,
    eventName,
    eventDate,
    eventTime,
    groomName = null,
    brideName = null,
    specialPersonName = null,
    place,
    address,
  } = req.body;

  try {
    // Set conditional fields based on eventType
    const eventData = {
      eventName,
      eventDate,
      eventTime,
      place,
      address,
      groomName: eventType === "marriage" ? groomName : null,
      brideName: eventType === "marriage" ? brideName : null,
      specialPersonName: eventType === "birthday" ? specialPersonName : null,
    };

    // Create Event and associated EventData
    const event = await prisma.event.create({
      data: {
        userId,
        eventType,
        eventData: {
          create: eventData,
        },
      },
      include: {
        eventData: true,
      },
    });

    res.json(event);
  } catch (error) {
    console.error("Error registering event:", error);
    res.status(500).json({ error: "Error registering event" });
  }
};

// Get all event IDs for a given userId
const getUserEvents = async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await prisma.event.findMany({
      where: {
        userId: parseInt(userId),
      },
      select: {
        eventId: true, // Select only the eventId field
      },
    });

    if (!events.length) {
      return res.status(404).json({ error: "No events found for this user" });
    }

    res.json(events);
  } catch (error) {
    console.error("Error fetching event IDs:", error);
    res.status(500).json({ error: "Error fetching event IDs" });
  }
};

// Get detailed event data by eventId
const getEventDataById = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await prisma.event.findUnique({
      where: {
        eventId: parseInt(eventId),
      },
      include: {
        eventData: true, // Fetch associated EventData
      },
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Error fetching event data:", error);
    res.status(500).json({ error: "Error fetching event data" });
  }
};

module.exports = { registerEvent, getUserEvents, getEventDataById };
