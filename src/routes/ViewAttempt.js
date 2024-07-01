const express = require('express');
const router = express.Router();
const AttemptQuiz = require('../models/Attempt');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

router.get('/:attemptId', async (req, res) => {
  try {
    const attemptId = req.params.attemptId;

    const quizResult = await AttemptQuiz.findById(attemptId)
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

    console.log('Attempt:', quizResult);
    if (!quizResult) {
      return res.status(404).json({ message: 'Attempted quiz not found' });
    }
    res.send(quizResult);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
