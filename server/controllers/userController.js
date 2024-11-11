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
    const user = await prisma.user.create({
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
  const { emailId, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { emailId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

// Edit user details
const editUser = async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, mobileNumber, emailId, userType } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: {
        firstName,
        lastName,
        mobileNumber,
        emailId,
        userType,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

module.exports = { createUser, loginUser, editUser };
