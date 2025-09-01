const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    image: { type: String }, // stores relative file path like 
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true

    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

module.exports = mongoose.model('users', userSchema)  //exporting the model to use in other files