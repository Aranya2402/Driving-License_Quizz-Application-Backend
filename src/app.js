// const express = require('express');
// const app = express();
// const authController = require('./modules/auth/auth-controller');

// app.use(express.json());

// app.post('/auth/sign-in', authController.signInUser);

// app.get('/', (req, res) => {
    // res.send("hellllo")
// })

// 

// module.exports = app;

// app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { body } = require('express-validator');

const ExamDash = require('./modules/ExamDashboard/ExamDash');
const userActivity = require('./modules/UserActivityLog/UserActivity'); 
const certificateRouter = require('./modules/DCertificate/Certificate');

const authController = require('./modules/auth/auth-controller');

const addQuestionController = require("./routes/AddQuestions");
const viewResult = require("./routes/ViewResult");
const submitQuiz = require("./routes/SubmitQuiz");
const getAttemptedQuizzes = require("./routes/GetQuizAttempt")
const createQuiz = require("./routes/CreateQuiz");
const createCandidate = require("./routes/CreateCandidate")

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post(
    '/auth/sign-in', // path
    body('email').isEmail(), // f1
    authController.signInUser // f2
);


// Routes
// app.use('/api/exam-dashboard/exams', ExamDash);

// app.route('/user-activity')
// .post(userActivity.login)
// .post( userActivity.logout)

//aranya
app.post('/user-activity/login', userActivity.login); 
app.post('/user-activity/logout', userActivity.logout); 
app.post('/user-activity/attempting', userActivity.attempting );

app.get('/user-activity/check', (req, res) => {
    res.send('User activity log module is running successfully!');
});

app.use('/certificates', certificateRouter); // Mount certificateRouter under /certificates path


// Lehaan
// app.use('/addQA', addQuestionController);
// app.use('/viewResult', viewResult);
// app.use('/attempt', submitQuiz);
// app.use('/getattempts', getAttemptedQuizzes);
// app.use('/newquiz', createQuiz);
// app.use('/candidate', createCandidate);

// app.use('/certificates', certificateRouter);

module.exports = app; 

