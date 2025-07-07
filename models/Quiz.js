const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number // index (0, 1, 2, 3) of the correct option
});

const quizSchema = new mongoose.Schema({
  course: String, // e.g., "computer-science"
  questions: [questionSchema]
});

module.exports = mongoose.model('Quiz', quizSchema);
