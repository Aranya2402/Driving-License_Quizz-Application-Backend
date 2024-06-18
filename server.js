const app = require("./src/app");
const mongoose = require("mongoose");
const port = 3002;

mongoose.connect('mongodb://localhost:27017/onlinedrivingquiz', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(port, () => console.log(`Server is running on port ${port}`));
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});
