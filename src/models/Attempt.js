const mongoose = require('mongoose');

const candidateAnswers = new mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    selectedAnswer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }
})

const attemptQuizSchema = new mongoose.Schema({
    candidate_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    },
    quiz_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    selectedAnswers: [candidateAnswers],
    quiz_date: {
        type: Date,
        default: Date.now
    },
    score: {
        type: Number,
        default: 0
    },
    result: {
        type: Boolean,
        default: false
    },

});

module.exports = mongoose.model('Attempt', attemptQuizSchema);


// module.exports = mongoose.model('Attempt', attemptQuizSchema);
