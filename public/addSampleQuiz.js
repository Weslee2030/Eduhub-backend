const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Quiz = require('./models/Quiz');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
  seedQuiz();
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

const seedQuiz = async () => {
  const sampleQuiz = new Quiz({
    course: 'computer-science',
    questions: [
      {
        question: 'What does CPU stand for?',
        options: ['Central Processing Unit', 'Computer Power Unit', 'Control Processing Unit', 'Central Print Unit'],
        correctAnswer: 0
      },
      {
        question: 'What is the main function of RAM?',
        options: ['Store permanent data', 'Run the OS', 'Provide temporary memory', 'Control hardware'],
        correctAnswer: 2
      },
      {
        question: 'Which language is most used for web development?',
        options: ['Python', 'Java', 'C++', 'JavaScript'],
        correctAnswer: 3
      }
    ]
  });

  try {
    await Quiz.deleteMany({ course: 'computer-science' }); // Clear old data
    await sampleQuiz.save();
    console.log('✅ Sample quiz added');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding quiz:', err);
    process.exit(1);
  }
};
