const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Get a specific course by ID
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.json(course);
});

// Create a new course
router.post('/', async (req, res) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json(newCourse);
});

module.exports = router;
