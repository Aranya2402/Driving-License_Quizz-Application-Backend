const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { body } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

const ExamDash = require('./modules/ExamDashboard/ExamDash');
const userActivity = require('./modules/UserActivityLog/UserActivity'); 
const certificateRouter = require('./modules/DCertificate/certi');

const authController = require('./modules/auth/auth-controller'); //check the route

const addQuestionController = require("./routes/AddQuestions_Lehaan");
const viewAttempt = require("./routes/ViewAttempt");
const submitQuiz = require("./routes/SubmitQuiz");
const getAttemptedQuizzes = require("./routes/GetQuizAttempt")
const createQuiz = require("./routes/CreateQuiz");
const createCandidate = require("./routes/CreateCandidate")
const { createCheckoutSession, getSessionStatus } = require('./modules/Payment/stripe-integration');
const stripeWebHook = require('./modules/Payment/webhook');
const transactionLog = require('./modules/TransactionLog/transaction-log')
const submitAttempt = require("./routes/SubmitAttempt")
const createAttempt = require("./routes/CreateAttempts");


const questionRouter = require('./routes/addQuestions')


const authRouter = require("./routes/auth");


const app = express();


app.use(cors({ origin: 'http://localhost:3000' })); //accepting request from cross-origin

app.use('/webhook', stripeWebHook);

app.use(express.json());

app.use(bodyParser.json());

app.use( '/api/auth', authRouter );





// Routes
//Aranya
// app.use('/api/exam-dashboard/exams', ExamDash);

app.use('/certificates', certificateRouter); 
app.use('/activitylog', userActivity);


app.post('/create-checkout-session', createCheckoutSession);
app.get('/session-status', getSessionStatus);
app.use('/transaction', transactionLog);


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


const myMiddleware = (req, res, next) => {
    // Middleware logic here
    console.log('Middleware executed');
    next(); // Call next to pass control to the next middleware or route handler
  };
  
  // Using middleware in Express
  app.use(myMiddleware);
  