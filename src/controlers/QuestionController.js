const path = require('path');

// const question = require('../models/questionSchema'); // Importing question model
// const answer = require('../models/answerSchema'); // Importing answer model


const getQuestions = async (req, res) =>
{
    // try {
    //     // Assuming question.find() retrieves all questions
    //     const questions = await question.find()
    //     .populate('answers')
    //     res.status(200).json(questions);
        
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal server error' });
    // }
}

const createQuestion = async (req,res) =>
{
    try {
        // console.log(req.body);
        // const newAnswers = await Promise.all(req.body.answers.map(answerData =>
        //     new answer({
        //         answer_text: answerData.answer_text,
        //         is_correct: answerData.is_correct
        //     }).save()
        // ));

        // const newQuestion = new question({
        //     question_text: req.body.question_text,

        //     answers: newAnswers.map(answer => answer._id),

        //     tests : req.body.tests,

        //     type_of_exam : req.body.type_of_exam

        // });

        // const savedQuestion = await newQuestion.save();
        // res.status(201).json(savedQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {createQuestion, getQuestions};