const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');


// Create a new question along with answers
router.post('/', async (req, res) => {
  try {
    // Create the question
    const question = await Question.create({
      question_text: req.body.question_text,
      difficulty: req.body.difficulty,
      questionType: req.body.questionType,
    });

    // Create the answers
    const answers = [];
    for (const answerData of req.body.answers) {
      const answer = new Answer({
        question_id: question._id,
        answer_text: answerData.answer_text,
        isCorrect: answerData.isCorrect,
      });
      answers.push(await answer.save());
    }

    const answerIds = answers.map(answer => answer._id);
    await Question.findByIdAndUpdate(question._id, { answers: answerIds });

    res.json({ question, answers });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/get', async (req, res) => {
  try {
    // Populate the 'answers' field with the corresponding Answer documents
    const questions = await Question.find().populate('answers');
    let response = questions;
    res.send(response);
  } catch (error) {
    console.error('Error retrieving questions:', error.message);
    throw error; // Re-throw the error for proper handling
  }
});

router.get('/get/:qId', async (req, res) => {
  try {
    const qId = req.params.qId;
    const question = await Question.findById(qId).populate('answers');

    let response = question;
    res.send(response);
  } catch (error) {
    console.error('Error retrieving questions:', error.message);
    throw error; // Re-throw the error for proper handling
  }
});

module.exports = router;


// {
//   "question_text": "Sample question 8?",
//   "difficulty": "Hard",
//   "questionType": false,
//   "answers": [
//       { "answer_text": "Answer 33", "isCorrect": true },
//       { "answer_text": "Answer 34", "isCorrect": false },
//       { "answer_text": "Answer 35", "isCorrect": false },
//       { "answer_text": "Answer 36", "isCorrect": false }
//   ]
// }
