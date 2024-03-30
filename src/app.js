const express = require('express');
const app = express();
const authController = require('./modules/auth/auth-controller');

app.use(express.json());

app.post('/auth/sign-in', authController.signInUser);

app.get('/', (req, res) => {
    res.send("hellllo")
})

// 

module.exports = app;