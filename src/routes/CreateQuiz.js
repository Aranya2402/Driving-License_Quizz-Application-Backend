const express = require('express');
const router = express.Router();


  const quizcontroller = require('../controlers/QuizController')


  router.route('/createQuiz')
  .post(quizcontroller.createQuiz)


  module.exports = router;  