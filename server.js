const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");

const mongoose = require("mongoose");
const questionRouter = require('./src/routes/addQuestions')

const port = process.env.APP_PORT || 3000;
app.use('/questionssss' , questionRouter)

mongoose.connect(process.env.MONGO_CONNECTION_URL)
    .then(r => {
        console.log("MongoDB connected")
    })
    .catch(err => {
        console.log("Error connecting mongodb Database", err);
    })

app.listen( port, () => console.log("Server is running"));

