const mongoose = require('mongoose');

const mongoConnect = (callback) => {
    mongoose.connect('mongodb+srv://root:root@cluster0.g445yuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB!');
        callback();
    })
    .catch(err => {
        console.log('MongoDB connection error:', err);
        throw err;
    });
}

module.exports = { mongoConnect };

