//const app = require("./src/app");
const express = require('express');
const app = express();


const mongoose = require("mongoose");
const questionRouter = require('./src/routes/addQuestions')

const port = 4000;

app.use('/questionssss' , questionRouter)


mongoose.connect('mongodb://127.0.0.1:27017/Questions')
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch(err => {
        console.log("Error connecting mongodb Database", err);
    })

app.listen( port, () => console.log("Server is running"));

