const express = require('express');
const router = express.Router();
const AttemptQuiz = require('../models/Attempt');

// Save attempted quiz data
router.post('/', async (req, res) => {
    try {
        const { candidate_id, selectedAnswers, score, result, quiz_id } = req.body;

        const selectedAnswersArray = [];

        selectedAnswers.forEach(answer => {
            selectedAnswersArray.push({
                question_id: answer.question_id,
                selectedAnswer_id: answer.selectedAnswer_id,
            });
        });

        const attempt = new AttemptQuiz({
            // candidate_id: req.body.candidate_id,
            candidate_id,
            selectedAnswers: selectedAnswersArray,
            score,
            result,
            quiz_id
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

module.exports = router;


// {
//     "candidate_id": "662ba1c47a9e83b21cbc6d31",
//     "quiz_id": "662b850c7b2bc1cc8b728ce3",
//     "selectedAnswers": [
//         {"question_id": "662b7eaebf0984c50ac0a81e", "selectedAnswer_id": "662b7eaebf0984c50ac0a826"}
//     ],
//     "score": 35,
//     "result": false
// }