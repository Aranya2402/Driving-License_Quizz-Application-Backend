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
const bodyParser = require('body-parser');
const ExamDash = require('./modules/ExamDashboard/ExamDash');
const userActivity = require('./modules/UserActivityLog/UserActivity'); 
const certificateRouter = require('./modules/DCertificate/Certificate');


const app = express();
// Middleware
app.use(bodyParser.json());

// Routes
// app.use('/api/exam-dashboard/exams', ExamDash);


// app.route('/user-activity')
// .post(userActivity.login)
// .post( userActivity.logout)
// .get( userActivity.getAttemptedExams);


app.use('/certificates', certificateRouter);

module.exports = app; 

