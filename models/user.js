const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const crypto = require('crypto')
 // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
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
    googleId: String,
    mobile:{
        type:String,
        unique:true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Seller'],
        default: 'Admin'
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

// userSchema.statics.findOrCreate = async function (profile) {
//     const User = this;
//     try {
//       const user = await User.findOne({ email : profile.email });
//       if (user) {
//         return user // Return a message indicating that the user exists
//       }
//       const newUser = new User({
//         //username: profile.email,
//         googleId: profile.id,
//         name: profile.displayName,
//         email: profile.email
//         // ...other user fields based on profile
//       });
//       return await newUser.save();
//     } catch (err) {
//       throw err;
//     }
//   };

// userSchema.statics.findOrCreate = function (profile, done) {
//     const User = this;
//     User.findOne({ username: profile.email }, (err, user) => {
//       if (err) return done(err);
//       if (user) return done(null, user);
//       const newUser = new User({
//         //username: profile.email,
//         googleId: profile.id,
//         name: profile.name,
//         email: profile.email
//         // ...other user fields based on profile
//       });
//       newUser.save((err, savedUser) => {
//         if (err) return done(err);
//         return done(null, savedUser);
//       });
//     });
//   };

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000
    return resetToken
}

//Export the model
module.exports = mongoose.model('User', userSchema);