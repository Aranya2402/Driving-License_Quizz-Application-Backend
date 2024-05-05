const express = require('express')
const router = express.Router()
const path = require('path')


const questionController = require('../controlers/QuestionController');


router.route('/createQuestion')
.post(questionController.createQuestion)


router.route('/listOfQuestions')
.get(questionController.getQuestions)


module.exports = router;