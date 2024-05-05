const express = require('express');
const router = express.Router();
const AttemptQuiz = require('../models/Attempt');
const { path } = require('../app');
const { populate } = require('../models/Answer');

// Save attempted quiz data
router.get('/', async (req, res) => {
  try {
    const attemptedQuizzes = await AttemptQuiz.find()
      .populate('candidate_id')
      .populate({
        path: 'quiz_id',
      })
      .populate({
        path: 'selectedAnswers',
        populate: [
          {
            path: 'question_id',
            populate: {
              path: 'answers'
            }
          },
          { path: 'selectedAnswer_id' }
        ]

      })
    res.send(attemptedQuizzes);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
