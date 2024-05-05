const express = require('express');
const app = express();
const authController = require('./modules/auth/auth-controller');
const { body } = require('express-validator');

app.use(express.json());

app.post(
    '/auth/sign-in', // path
    body('email').isEmail(), // f1
    authController.signInUser // f2
);


// 

module.exports = app;