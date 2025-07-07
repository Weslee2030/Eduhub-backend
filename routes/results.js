const express = require('express');
const router = express.Router();
const QuizResult = require('../models/QuizResult');

// Submit a quiz result
router.post('/', async (req, res) => {
  const result = new QuizResult(req.body);
  await result.save();
  res.status(201).json(result);
});

// Get all results by user
router.get('/:userId', async (req, res) => {
  const results = await QuizResult.find({ userId: req.params.userId });
  res.json(results);
});

module.exports = router;
