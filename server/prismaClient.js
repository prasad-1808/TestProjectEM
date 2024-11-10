// server/prismaClient.js

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Export the prisma client to use in other parts of the application
module.exports = prisma