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

const app = express();
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/exam-dashboard/exams', ExamDash);

module.exports = app; // Export the app instance

