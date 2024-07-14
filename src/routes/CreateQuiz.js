const express = require('express');
const router = express.Router();


  const quizcontroller = require('../controlers/QuizController')


  router.route('/createQuiz')
  .post(quizcontroller.createQuiz)

  router.route('/getquizQuestions/:id')
  .get(quizcontroller.getQuiz);

  router.route('/deleteQuiz/:id')
  .delete(quizcontroller.deleteQuiz)
  

  module.exports = router;  

