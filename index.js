const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static('public'));
app.use(express.json());

// 🔐 User Info API
app.get('/api/user/me', (req, res) => {
  res.json({ name: 'Wesley Orina', email: 'wesleyorina97@gmail.com' });
});

// 📚 Enrolled Courses API
app.get('/api/courses', (req, res) => {
  res.json([
    { title: 'Computer Science', progress: 60 },
    { title: 'Business Management', progress: 80 }
  ]);
});

// 🧠 Quiz Scores API
app.get('/api/quiz-scores', (req, res) => {
  res.json([
    { course: 'Computer Science', score: 85 },
    { course: 'Business', score: 92 }
  ]);
});

// 💳 Payments API
app.get('/api/payments', (req, res) => {
  res.json([
    { course: 'Computer Science', status: 'Paid' },
    { course: 'Business Management', status: 'Paid' }
  ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ EduHub server running at http://localhost:${PORT}`);
});
