const app = require("./src/app");
const mongoose = require('mongoose');




const port = 3000;




mongoose.connect('mongodb://localhost:27017/FinalProject')
.then(() => {console.log('Connected to the DB');})
.catch((error) => {console.error("Error:", error)})

app.listen( port, () => console.log("Server is running"));
