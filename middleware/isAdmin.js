const User = require('../models/user')
const { UnauthenticatedError } = require('../errors')
const asyncHandler = require('express-async-handler')
const isAdmin = asyncHandler(async(req, res, next) => {
    const {email} = req.user
    const sellerEmail = await User.findOne({ email })
    if(sellerEmail.role != 'Admin'){
        throw new UnauthenticatedError('You are not an Admin')
    } else {
        next()
    }
})

module.exports = isAdmin