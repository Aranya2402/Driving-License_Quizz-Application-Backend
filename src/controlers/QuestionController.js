const Question = require('../models/questionSchema');
const Answer = require('../models/answerSchema');

const TestQuestion = require('../models/TestingSchema')


const getQuestions = async (req, res) => 
{
    try 
    {
        const questions = await Question.find().populate('answers');
        res.status(200).json(questions);
    } 
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const createQuestionss = async (req, res) => {
    try {
        
        console.log("Request Body:", req.body);

        if (!req.body.answers) {
            throw new Error("Answers array is missing in the request body");
        }

        const newAnswers = await Promise.all(req.body.answers.map(answerData =>  new Answer({
            answer_text: answerData.answer_text,
            is_correct : answerData.is_correct
        }).save()));

        const newQuestion = new Question({
            question_text: req.body.question_text,
            answers: newAnswers.map(answers => answers._id), // Corrected from answer to answers
            tests: req.body.tests, // Assuming tests is meant to be a string
            type_of_exam: req.body.type_of_exam // Assuming type_of_exam is meant to be an array
        });
                                                                
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server errorrrr' });
    }
}

const questionsForFiltering = async (req, res) => 
{
    try 
    {
        const questions = await Question.find().populate('answers');
        res.status(200).json(questions);
    } 
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const addquestion = async (req, res) => {
    try {
        const newQuestion = new TestQuestion({
          question_text: req.body.question_text,
          answers: req.body.answers
        });
    
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion); // Send created question back
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }


module.exports = { createQuestionss, getQuestions ,questionsForFiltering, addquestion};