const express = require('express');
const router = express.Router();
const AttemptQuiz = require('../models/Attempt');

// Update score and result for a specific attempt
router.put('/:id', async (req, res) => {
    try {
        const { selectedAnswers, score, result, } = req.body;

        const selectedAnswersArray = selectedAnswers.map(answer => ({
            question_id: answer.question_id,
            selectedAnswer_id: answer.selectedAnswer_id || null,
        }));

        // Find the attempt by ID and update the score and result
        const updatedAttempt = await AttemptQuiz.findByIdAndUpdate(
            req.params.id,
            { 
                score, 
                result, 
                selectedAnswers:  selectedAnswersArray 
            },
            { new: true } // Return the updated document
        );

        if (!updatedAttempt) {
            return res.status(404).json({ message: 'Attempt not found' });
        }

        // Respond with the updated attempt
        res.status(200).json(updatedAttempt);
    } catch (err) {
        // If there's an error, respond with an error status and message
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;


// {
//     "score" : "20",
//     "result" : false,
//     "selectedAnswers" : [
//          {"question_id": "662b7eaebf0984c50ac0a81e", "selectedAnswer_id": "662b7eaebf0984c50ac0a824"}       
//     ]
// }