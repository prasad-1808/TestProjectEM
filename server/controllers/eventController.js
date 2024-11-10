const {prisma} = require("../prismaClient.js");

// Create a new event
const createEvent = async (req, res) => {
    const { userId, eventName } = req.body;
    try {
      const event = await prisma.event.create({
        data: {
          userId,
          eventName,
        },
      });
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: 'Error creating event' });
    }
  };

module.exports = {createEvent}