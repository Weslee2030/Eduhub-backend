// index.js — EduHub Mock Backend (No Database)
const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static("public"));

// 🧪 Fake Register Route
app.post("/register", (req, res) => {
  const { email } = req.body;
  return res.status(201).json({ message: `✅ Registered user ${email}` });
});

// 🧪 Fake Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // ✅ Accept only one test account
  if (email === "test@example.com" && password === "test1234") {
    return res.status(200).json({ message: "✅ Login successful", email });
  } else {
    return res.status(400).json({ message: "❌ Incorrect credentials" });
  }
});

// 📚 Fake Course API
app.get("/api/courses", (req, res) => {
  res.json([
    { title: "Computer Science", progress: 60 },
    { title: "Business Management", progress: 80 }
  ]);
});

// 🧠 Fake Quiz Scores
app.get("/api/quiz-scores", (req, res) => {
  res.json([
    { course: "Computer Science", score: 85 },
    { course: "Business", score: 92 }
  ]);
});

// 💳 Fake Payment Status
app.get("/api/payments", (req, res) => {
  res.json([
    { course: "Computer Science", status: "Paid" },
    { course: "Business Management", status: "Paid" }
  ]);
});

// 👤 Fake User Info
app.get("/api/user/me", (req, res) => {
  res.json({
    name: "Wesley Orina",
    email: "wesleyorina97@gmail.com"
  });
});

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("🎓 EduHub Mock Backend is running.");
});

// 🟢 Start Server
app.listen(PORT, () => {
  console.log(`✅ EduHub mock backend running at http://localhost:${PORT}`);
});
