const express = require('express');
const app = express();
const cors = require('cors');
const authController = require('./modules/auth/auth-controller');

const addQuestionController = require("./routes/AddQuestions");
const viewResult = require("./routes/ViewResult");
const submitQuiz = require("./routes/SubmitQuiz");
const getAttemptedQuizzes = require("./routes/GetQuizAttempt")
const createQuiz = require("./routes/CreateQuiz");
const createCandidate = require("./routes/CreateCandidate")

app.use(express.json());
app.use(cors());

app.post('/auth/sign-in', authController.signInUser);

app.get('/', (req, res) => {
    res.send("hellllo")
})

// Lehaan
app.use('/addQA', addQuestionController);
app.use('/viewResult', viewResult);
app.use('/attempt', submitQuiz);
app.use('/getattempts', getAttemptedQuizzes);
app.use('/newquiz', createQuiz);
app.use('/candidate', createCandidate);

module.exports = app;