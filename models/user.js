const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 50,
        index:true,
    },
    email:{
        type:String,
        required: [true, 'Please provide email'],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid email'
        ],
        unique:true,
    },
    mobile:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        required: [true, 'Please provide password'],
        minLength: 6,
    },
});

//Export the model
module.exports = mongoose.model('User', userSchema);