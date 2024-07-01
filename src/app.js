const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { body } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

const ExamDash = require('./modules/ExamDashboard/ExamDash');
const userActivity = require('./modules/UserActivityLog/UserActivity'); 
const certificateRouter = require('./modules/DCertificate/Certificate');

const authController = require('./modules/auth/auth-controller'); //check the route

const addQuestionController = require("./routes/AddQuestions_Lehaan");
const viewAttempt = require("./routes/ViewAttempt");
const submitQuiz = require("./routes/SubmitQuiz");
const getAttemptedQuizzes = require("./routes/GetQuizAttempt")
const createQuiz = require("./routes/CreateQuiz");
const createCandidate = require("./routes/CreateCandidate")
const { createCheckoutSession, getSessionStatus } = require('./modules/Payment/stripe-integration');
const stripeWebHook = require('./modules/Payment/webhook');
const submitAttempt = require("./routes/SubmitAttempt")
const createAttempt = require("./routes/CreateAttempts");


const questionRouter = require('./routes/addQuestions')

const createCandidate = require("./routes/CreateCandidate")
const authRouter = require("./routes/auth");
const { createCheckoutSession, getSessionStatus } = require('./modules/Payment/stripe-integration');

const app = express();


app.use(cors());

app.use('/webhook', stripeWebHook);

app.use(express.json());

app.use(bodyParser.json());

app.use( '/api/auth', authRouter );


//aranya
app.post('/user-activity/login', userActivity.login); 
app.post('/user-activity/logout', userActivity.logout); 
app.post('/user-activity/attempting', userActivity.attempting );

// Routes
// app.use('/api/exam-dashboard/exams', ExamDash);

app.get('/user-activity/check', (req, res) => {
    res.send('User activity log module is running successfully!');
});


app.use('/certificates', certificateRouter); // Mount certificateRouter under /certificates path

app.post('/create-checkout-session', createCheckoutSession);
app.get('/session-status', getSessionStatus);


// // Lehaan
app.use('/addQA', addQuestionController);
app.use('/viewattempt', viewAttempt);
app.use('/attempt', submitQuiz);
app.use('/getattempts', getAttemptedQuizzes);
app.use('/newquiz', createQuiz);
app.use('/candidate', createCandidate);
app.use('/newattempt', createAttempt);
app.use('/submit', submitAttempt);


//Banu
module.exports = app; 


//Fathhy
app.use('/questions' , questionRouter)

