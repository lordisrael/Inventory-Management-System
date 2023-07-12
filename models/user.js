const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
 // Erase if already required

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
    role: {
        type: String,
        enum: ['User', 'Seller'],
        default: 'User'
    },
    password:{
        type:String,
        required: [true, 'Please provide password'],
        minLength: 6,
    },
    refreshToken: {
        type: String
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
});


userSchema.pre('save', async function(next) {
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000
    return resetToken
}

//Export the model
module.exports = mongoose.model('User', userSchema);