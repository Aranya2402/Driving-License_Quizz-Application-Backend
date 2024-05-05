const mongoose = require('mongoose');

const attemptQuizSchema = new mongoose.Schema({
    // candidate_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Candidate'
    // },
    quizName: {
        type: String,
    },
    difficulty: {
        type: String,
    },
    quizType: {
        type: Boolean,
    },
    quiz_date:{
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
    questions:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
        }]
});

module.exports = mongoose.model('AttemptQuiz', attemptQuizSchema)