const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

// Register a User
const registerUser = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};
// Login a User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };
