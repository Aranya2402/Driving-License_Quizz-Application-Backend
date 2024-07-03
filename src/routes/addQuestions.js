const express = require('express');
const router = express.Router()


const questionController = require('../controlers/QuestionController');


router.route('/createQuestion')
.post(questionController.createQuestionss)

router.route('/listOfQuestions')
.get(questionController.getQuestions)

router.route('/deleteQuestion/:id')
.delete(questionController.deleteQuestion)


module.exports = router;