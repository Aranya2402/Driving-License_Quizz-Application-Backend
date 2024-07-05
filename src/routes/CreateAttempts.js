const express = require('express');
const router = express.Router();
const AttemptQuiz = require('../models/Attempt');
const Quiz = require("../models/Quiz")

// Save attempted quiz data
router.post('/', async (req, res) => {
    try {
        const { candidate_id, quiz_id } = req.body;

        const quiz = await Quiz.findById(quiz_id).populate('questions');
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        // Initialize selectedAnswers array with question IDs
        const selectedAnswers = quiz.questions.map(question => ({
            question_id: question._id,
            selectedAnswer_id: null
        }));

        const attempt = new AttemptQuiz({
            // candidate_id: req.body.candidate_id,
            candidate_id,
            quiz_id,
            selectedAnswers
        });

        // Save the new attempt to the database
        const savedAttempt = await attempt.save();

        // Respond with the saved attempt
        res.status(201).json(savedAttempt);
    } catch (err) {
        // If there's an error, respond with an error status and message
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const { email } = req.query;

        // Find candidate by email
        const candidate = await Candidate.findOne({ email });
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        const attempts = await AttemptQuiz.find({ candidate_id: candidate._id }).populate('quiz_id');

        if (attempts.length === 0) {
            return res.status(404).json({ message: 'No attempts found for this candidate' });
        }

        
        const latestAttempt = attempts[0];

        const certificateData = {
            recipientName: candidate.name, 
            courseName: latestAttempt.quiz_id.title, 
            completionDate: latestAttempt.quiz_date,
        };

        res.json(certificateData);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
module.exports = router;


// {
//     "candidate_id": "662ba1c47a9e83b21cbc6d31",
//     "quiz_id": "662b850c7b2bc1cc8b728ce3",
// }