const {prisma} = require("../prismaClient.js");

// Create a new user
const createUser = async (req, res) => {
  const { firstName, lastName, mobileNumber, emailId, userType, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        mobileNumber,
        emailId,
        userType,
        password, // Make sure to hash the password before saving in production
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

module.exports = {createUser}