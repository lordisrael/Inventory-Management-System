const User = require('../models/user')
const { UnauthenticatedError } = require('../errors')
const asyncHandler = require('express-async-handler')
const isSeller = asyncHandler(async(req, res, next) => {
    const {email} = req.user
    const sellerEmail = await User.findOne({ email })
    if(sellerEmail.role != 'Seller'){
        throw new UnauthenticatedError('You are not a seller')
    } else {
        next()
    }
})

module.exports = isSeller