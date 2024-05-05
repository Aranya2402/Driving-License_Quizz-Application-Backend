const app = require("./src/app");
const mongoose = require("mongoose");
const port = 3000;

mongoose.connect('mongodb://localhost:27017/onlinedrivingquiz')
    .then(r => {
        console.log("MongoDB connected")
    })
    .catch(err => {
        console.log("Error connecting mongodb", err);
    })

app.listen( port, () => console.log("Server is running"));
