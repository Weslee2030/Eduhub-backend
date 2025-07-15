const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// ✅ User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, unique: true },
  password: String,
  paidCourses: [String]
});

const User = mongoose.models.User || mongoose.model('User', userSchema); // ✅ Reuse if exists

// ✅ Register Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '❌ Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log(`✅ Registered user: ${email}`);
    return res.status(201).json({ message: `✅ Registered user ${email}` });
  } catch (error) {
    console.error("❌ Registration error:", error);
    return res.status(500).json({ message: '❌ Server error during registration.' });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: '❌ Incorrect credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(400).json({ message: '❌ Incorrect credentials' });
    }

    console.log(`✅ Login successful: ${user.email}`);
    return res.status(200).json({ message: `✅ Logged in as ${user.email}` });
  } catch (error) {
    console.error("❌ Login error:", error);
    return res.status(500).json({ message: '❌ Server error during login' });
  }
});

module.exports = router;
