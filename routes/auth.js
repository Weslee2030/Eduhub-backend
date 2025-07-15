const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// ✅ User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  paidCourses: [String]
});

const User = mongoose.model('User', userSchema);

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

    res.status(201).json({ message: `✅ Registered user ${email}` });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: '❌ Server error during registration.' });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '❌ Invalid email or password (user not found)' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '❌ Invalid email or password (wrong password)' });
    }

    res.status(200).json({
      message: '✅ Login successful',
      user: {
        name: user.name,
        email: user.email,
        paidCourses: user.paidCourses || []
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: '❌ Server error during login.' });
  }
});

module.exports = router;
