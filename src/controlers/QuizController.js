const Quiz = require('../models/Quiz');

// GET /quiz/:id
const getQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz.questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /quiz/createQuiz
const createQuiz = async (req, res) => {
  console.log('received......', req.body);

  try {
    const existingQuiz = await Quiz.findOne({
      quizName: req.body.quizName,
      difficulty: req.body.difficulty,
      quizType: req.body.quizType,
    });

    if (existingQuiz) {
      return res.status(400).json({ message: 'Quiz with this name, difficulty, and type already exists.' });
    }

    const quiz = await Quiz.create({
      quizName: req.body.quizName,
      difficulty: req.body.difficulty,
      quizType: req.body.quizType,
      questions: req.body.questions,
      description: req.body.description,
    });

    const savedQuiz = await quiz.save();

    res.status(201).json(savedQuiz);
    console.log('received after');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /quiz/:id
const deleteQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /quizzes (for batch deletion)
const deleteQuizzes = async (req, res) => {
  const { quizIds } = req.body;

  if (!Array.isArray(quizIds) || quizIds.length === 0) {
    return res.status(400).json({ message: 'No quiz IDs provided.' });
  }

  try {
    await Quiz.deleteMany({ _id: { $in: quizIds } });
    res.status(200).json({ message: 'Quizzes deleted successfully' });
  } catch (error) {
    console.error('Error deleting quizzes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createQuiz, getQuiz, deleteQuiz, deleteQuizzes };
