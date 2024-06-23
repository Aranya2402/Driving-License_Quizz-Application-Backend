const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    question_text: {
        type: String,
        required: true
    },
    answers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:  'Answer'
    }],
    tests : {
        type : String,
        required : true
    },
    type_of_exam :
    {
        type : Array,
       required : true
    }
});

module.exports = mongoose.model('Question', questionSchema);