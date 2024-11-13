const { prisma } = require("../prismaClient.js");
const bcrypt = require("bcryptjs"); // for password hashing
const jwt = require("jsonwebtoken"); // for creating tokens

const SECRET_KEY = "your_secret_key"; // Replace with environment variable in production

// Create a new user
const createUser = async (req, res) => {
  const { firstName, lastName, mobileNumber, emailId, userType, password } =
    req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.User.create({
      data: {
        firstName,
        lastName,
        mobileNumber,
        emailId,
        userType,
        password: hashedPassword, // Storing hashed password
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// Log in a user
const loginUser = async (req, res) => {
  const { mobileNumber, password, userType } = req.body;
  try {
    const user = await prisma.User.findUnique({ where: { mobileNumber } });
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided userType matches the user's role
    if (user.userType !== userType) {
      return res.status(401).json({ error: "Invalid role selected" });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Respond with token and userType (role)
    res.json({
      message: "Login successful",
      token,
      userType: user.userType, // Send userType back in the response
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

// Find a user by mobile number
const findUserByMobileNumber = async (req, res) => {
  const { mobileNumber } = req.params;
  try {
    const user = await prisma.User.findUnique({
      where: { mobileNumber },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error finding user by mobile number" });
  }
};

// Find a user by user ID
const findUserById = async (req, res) => {
  const { userId } = req.params;
  const parsedUserId = parseInt(userId, 10);
  
  if (isNaN(parsedUserId)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }
  
  try {
    const user = await prisma.User.findUnique({
      where: { userId: parsedUserId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error finding user by ID:", error); // Log the detailed error
    res.status(500).json({ error: "Error finding user by ID" });
  }
};



// Edit user details
const editUser = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, mobileNumber, emailId, userType } = req.body;

  // Check if userId is a valid integer
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  try {
    // Try to update the user in the database
    const user = await prisma.User.update({
      where: { userId: parseInt(userId) },
      data: {
        firstName,
        lastName,
        mobileNumber,
        emailId,
        userType,
      },
    });

    // Return the updated user
    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);  // Log the error for debugging
    res.status(500).json({ error: "Error updating user", details: error.message });
  }
};


module.exports = { createUser, loginUser, findUserByMobileNumber, findUserById, editUser };
