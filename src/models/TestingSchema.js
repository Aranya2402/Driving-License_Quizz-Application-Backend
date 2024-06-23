const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question_text: {
    type: String,
    required: true
  },
  answers: [{
    type: String,
    required: true
  }]
});

module.exports = mongoose.model('TestQuestion', questionSchema);
