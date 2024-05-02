const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    answer_text: {
        type: String,
        required: true
    },
    is_correct: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Answer', answerSchema);
