const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Submit quiz answers and get score
router.post('/submit/:quizId', async (req, res) => {
  const { quizId } = req.params;
  const { answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) score++;
    });

    res.json({ message: 'Quiz submitted', score, total: quiz.questions.length });
  } catch (err) {
    res.status(500).json({ error: 'Quiz submission failed' });
  }
});

module.exports = router;
