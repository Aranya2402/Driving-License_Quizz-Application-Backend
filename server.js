const app = require("./src/app");

const mongoose = require("mongoose");
const questionRouter = require('./src/routes/addQuestions')

const port = 3000;

app.use('/questions' , questionRouter)

mongoose.connect('mongodb://localhost:27017/FinalProject')
    .then(r => {
        console.log("MongoDB connected")
    })
    .catch(err => {
        console.log("Error connecting mongodb", err);
    })

app.listen( port, () => console.log("Server is running"));

