const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { findById } = require("../models/Product");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
// Get users (ADMIN ONLY)
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied." });
  }
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const oldToken = req.body.token;
    const decoded = jwt.verify(oldToken, process.env.SECRET);
    const user = await User.findById(decoded.userId);
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (role) user.role = role;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by ID (ADMIN ONLY)

router.delete("/:id", auth, async (req, res) => {
  if (req.body.role !== "admin") {
    return res.status(403).json({ error: "Access denied." });
  }
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
