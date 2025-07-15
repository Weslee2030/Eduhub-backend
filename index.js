// index.js — EduHub Full Backend (LIVE MongoDB)
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Your live MongoDB URI
const MONGODB_URI = "mongodb+srv://orinawesley9:PfhHqvCHmDKc63mV@cluster0.iu4cjtr.mongodb.net/EduHub?retryWrites=true&w=majority";

// 📦 Middleware
app.use(express.json());
app.use(express.static("public"));

// 🧠 Mongoose User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  paidCourses: [String],
});

const User = mongoose.model("User", userSchema);

// 🔐 Register route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "❌ Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: `✅ Registered user ${email}` });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "❌ Registration failed" });
  }
});

// 🔐 Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "❌ Incorrect credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "❌ Incorrect credentials" });

    res.status(200).json({ message: `✅ Logged in as ${email}` });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "❌ Login failed" });
  }
});

// 📚 Sample Courses
app.get("/api/courses", (req, res) => {
  res.json([
    { title: "Computer Science", progress: 60 },
    { title: "Business Management", progress: 80 }
  ]);
});

// 🧠 Sample Quiz Scores
app.get("/api/quiz-scores", (req, res) => {
  res.json([
    { course: "Computer Science", score: 85 },
    { course: "Business", score: 92 }
  ]);
});

// 💳 Sample Payments
app.get("/api/payments", (req, res) => {
  res.json([
    { course: "Computer Science", status: "Paid" },
    { course: "Business Management", status: "Paid" }
  ]);
});

// 👤 User Info (mock)
app.get("/api/user/me", (req, res) => {
  res.json({
    name: "Wesley Orina",
    email: "wesleyorina97@gmail.com"
  });
});

// 🛠 Debug: show users (no passwords)
app.get("/api/debug-users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to fetch users" });
  }
});

// ✅ Root
app.get("/", (req, res) => {
  res.send("🎓 EduHub backend is LIVE and connected to MongoDB!");
});

// 🚀 Start server
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`✅ EduHub backend running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
