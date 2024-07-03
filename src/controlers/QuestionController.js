const Question = require('../models/Question');
const Answer = require('../models/Answer');

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('answers');
        res.status(200).json(questions);
    }
    catch (error) {
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

        const newQuestion = new Question({
            question_text: req.body.question_text,
            difficulty: req.body.difficulty,
            questionType: req.body.questionType,
            imageUrl: req.body.imageUrl
        });
        const savedQuestion = await newQuestion.save();

        const newAnswers = await Promise.all(req.body.answers.map(answerData => new Answer({
            answer_text: answerData.answer_text,
            isCorrect: answerData.isCorrect,
            question_id: newQuestion._id,
        }).save()));

        const answerIds = newAnswers.map(answer => answer._id);
        await Question.findByIdAndUpdate(newQuestion._id, { answers: answerIds });

        res.status(201).json(savedQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server errorrrr' });
    }
}


const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params; // Correctly extract the id
        const deletedQuestion = await Question.findByIdAndDelete(id);

        if (!deletedQuestion) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Optionally delete related answers
        await Answer.deleteMany({ question_id: id });

        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { createQuestionss, getQuestions, deleteQuestion};