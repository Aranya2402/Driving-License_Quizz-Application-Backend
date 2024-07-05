const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");
const mongoose = require("mongoose");

const port = process.env.APP_PORT || 3000;


mongoose.connect(process.env.MONGO_CONNECTION_URL)
    .then(() => {
        console.log("MongoDB connected");

        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error("Error connecting to MongoDB Database", err);
    });
