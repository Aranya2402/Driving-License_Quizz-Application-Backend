const mongoose = require('mongoose');
const app = require('./src/app');

const port = 3000; // or any port you want to use

const mongoConnectionString = 'mongodb://127.0.0.1:27017/FinalProject';

mongoose.connect(mongoConnectionString)
    .then(() => {
        console.log('MongoDB connected');

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB Database', err);
    });
