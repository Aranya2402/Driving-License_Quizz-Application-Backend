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
        ref: 'Question',
        default : null
    }],
    // imageUrl :
    // {
    //     type : String,
    //     default : null
    // },
    description :
    {
        type : String,
        default : null
    }
})

module.exports = mongoose.model('Quiz', quizSchema);