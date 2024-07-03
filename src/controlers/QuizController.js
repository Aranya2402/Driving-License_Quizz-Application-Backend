
const Quiz = require('../models/Quiz');

// POST /quiz/createQuiz
const createQuiz = async (req, res) => {

  console.log('received', req.body)

  try {
    const quiz = await Quiz.create({
      quizName: req.body.quizName,
      difficulty: req.body.difficulty,
      quizType: req.body.quizType,
      questions: req.body.questions,
      description: req.body.description
    });

    const savedQuiz = await quiz.save();

    res.status(201).json(savedQuiz);

    console.log('received after')

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createQuiz };
