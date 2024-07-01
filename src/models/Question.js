const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question_text:{
        type: String,
        required: true
    },
    difficulty:{
        type: String,
        required: true
    },
    questionType:{
        type: Boolean,
        required: true
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    imageUrl: {
        type: String,
        default: null
    }
    
});

module.exports = mongoose.model('Question', questionSchema);