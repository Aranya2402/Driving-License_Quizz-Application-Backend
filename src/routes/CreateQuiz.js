const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

router.post('/', async (req, res) => {
    try {
      const quiz = await Quiz.create({
        quizName: req.body.quizName,
        difficulty: req.body.difficulty,
        quizType: req.body.quizType,
        questions: req.body.questions
      });
  
      const savedQuiz = await quiz.save();

      res.status(201).json(savedQuiz);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  module.exports = router;


  // {
  //   "quizName": "Sample Quiz 1",
  //   "difficulty": "Easy",
  //   "quizType": true,
  //   "questions": [
  //       "662b7eaebf0984c50ac0a81e"
  //   ]
  // }