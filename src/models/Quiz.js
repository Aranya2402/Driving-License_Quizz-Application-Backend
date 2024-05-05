const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: true
    },
    difficulty:{
        type: String,
        required: true
    },
    quizType: {
        type: Boolean,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
})

module.exports = mongoose.model('Quiz', quizSchema);