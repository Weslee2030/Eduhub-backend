// index.js — EduHub Live Mock Backend (No MongoDB Required)
const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static("public"));

// 🔐 Register (Mock)
app.post("/register", (req, res) => {
  const { email } = req.body;
  return res.status(201).json({ message: `✅ Registered user ${email}` });
});

// 🔐 Login (Mock)
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "test@example.com" && password === "test1234") {
    return res.status(200).json({ message: "✅ Login successful", email });
  } else {
    return res.status(400).json({ message: "❌ Incorrect credentials" });
  }
});

// 📚 Courses API
app.get("/api/courses", (req, res) => {
  res.json([
    { title: "Computer Science", progress: 60 },
    { title: "Business Management", progress: 80 }
  ]);
});

// 🧠 Quiz Scores API
app.get("/api/quiz-scores", (req, res) => {
  res.json([
    { course: "Computer Science", score: 85 },
    { course: "Business", score: 92 }
  ]);
});

// 💳 Payment Status API
app.get("/api/payments", (req, res) => {
  res.json([
    { course: "Computer Science", status: "Paid" },
    { course: "Business Management", status: "Paid" }
  ]);
});

// 👤 User Info API
app.get("/api/user/me", (req, res) => {
  res.json({
    name: "Wesley Orina",
    email: "wesleyorina97@gmail.com"
  });
});

// ✅ Root
app.get("/", (req, res) => {
  res.send("🎓 EduHub backend is up and running!");
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`✅ EduHub backend running at http://localhost:${PORT}`);
});
