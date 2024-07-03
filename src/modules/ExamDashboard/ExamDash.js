// ExamDash.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = express.Router();


// Middleware

router.use(bodyParser.json());


// Exam Schema

const Exam = require('../../models/ExamDB');


// Routes

router.get('/exams', async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/exams', async (req, res) => {
  try {
    // Create a new exam document based on request body
    const { title, image, description, rangeStart, rangeEnd } = req.body;
    const newExam = new Exam({ title, image, description, rangeStart, rangeEnd });

    // Save the new exam to the database
    const savedExam = await newExam.save();

    // Send success response
    res.status(201).json(savedExam);
  } catch (err) {
    console.error(err);
    // Send error response
    res.status(500).json({ error: 'Failed to add exam' });
  }
});


// Export router
module.exports = router;
