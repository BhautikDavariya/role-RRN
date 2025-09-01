const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/newCrud', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected');
    } catch (error) {
        console.error('DB Connect Error=>', error);
    }
}

module.exports = connectDB;  //exporting the function to use it in other files.