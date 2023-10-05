const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('../social_login')
const crypto = require('crypto')
const {StatusCodes} = require('http-status-codes')
const asyncHandler = require('express-async-handler')
const { createJWT } = require('../config/jwt')
const sendEmail = require('../config/sendEmail')
const {createRefreshJWT} = require('../config/refreshjwt')
const passportSetup = require('../social_login')
const { ConflictError, UnauthenticatedError, NotFoundError, BadRequestError } = require('../errors')

const createUser = asyncHandler(async(req, res) => {
    const {email} = req.body
    const userAlreadyExists = await User.findOne({email})
    if(!userAlreadyExists) {
        const user = await User.create(req.body)
        const token = createJWT(user.id, user.name)
        res.status(StatusCodes.CREATED).json({user, token: token})
    } else {
        throw new ConflictError('Email already Exists')
    }
})

const logingoogle = asyncHandler(async(req, res) => {
    const { email } = req.body
    const user = await User.findOrCreate({ googleId: profile.id })
})

const login = asyncHandler(async(req,res) => {
    const { email, password} = req.body
    const user = await User.findOne({email})
    if(user && (await user.comparePassword(password))){
        const refreshToken = await createRefreshJWT(user._id)
        await User.findByIdAndUpdate(user._id,
            {
                refreshToken: refreshToken
            },
            {new: true}
        )
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000  
        })
        res.status(StatusCodes.OK).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            token: createJWT(user._id, user.name)
        })
    } else {
        throw new UnauthenticatedError('Invalid crendentials')
    }

})

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    console.log(cookie)
    if(!cookie.refreshToken) throw new NotFoundError('No refreshToken Found')
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({refreshToken})
    if(!user) throw new NotFoundError('No refresh token, not matched in db')
    jwt.verify(refreshToken, process.env.JWT_SECRET, function(err, decoded) {
        if(err || user.id != decoded.id){
            throw new UnauthenticatedError('Invalid RefreshToken')
        }
        const token = createJWT(user._id, user.name)
        res.json({token})
    })

})

const logout = asyncHandler(async(req, res) => {
    const cookie = req.cookies
    if(!cookie.refreshToken) throw new UnauthenticatedError('No refreshToken Found')
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({refreshToken})
    if(!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        })
        return res.sendStatus(204)
    }
    await User.findOneAndUpdate({refreshToken}, {
        refreshToken: ""
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
    })
    return res.sendStatus(204)

})

const updatePassword = asyncHandler(async(req, res)=> {
    const{_id} = req.user
    const {password} = req.body
    const user = await User.findById(_id)
    if(password) {
        user.password = password
        const updatedPassword = await user.save()
        res.status(StatusCodes.OK).json({msg: 'You password has been updated'})
    } else {
        throw new BadRequestError('Fill in your password')
    }
}) 

const forgotPassword = asyncHandler(async(req, res) => {
    const {email} = req.body
    const user = await User.findOne({email})
    if(!email) {
        return res.status(400).json('Missing required fields');
    } 
    if(!user){
        throw new NotFoundError('No user with this given email')
    }
    const resetToken = user.createPasswordResetToken()
    await user.save()
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/reset/${resetToken}`
    const msg = `We have recieved a password reset request, please use the below link to rest your password\n\n${resetUrl}\n\nThis reset password link expires in 10 minutes`
    try {
        await sendEmail({
            email: user.email,
            subject: 'Password change request received',
            message: msg
        })
        res.status(StatusCodes.OK).json({
            status: "Success",
            msg: "Reset link sent to user"
        })
        
    } catch (error) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        user.save()
        throw new UnauthenticatedError('There was an error sending password reset token')
    }
})

const resetPassword = asyncHandler(async(req, res) => {
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        passwordResetToken: token,
        passwordResetExpires: {$gt: Date.now()}
    })
    if(!user) {
        throw new NotFoundError('Token is invalid or expires')
    }
    user.password = req.body.password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    user.passwordChangedAt = Date.now()
    user.save()
    // const tokenJWT = createJWT(user._id, user.name)
    // res.status(StatusCodes.OK).json({user: {name: user.name}, tokenJWT})
    res.status(StatusCodes.OK).json('Password reset, login again')
    
})

const getUser= asyncHandler(async(req, res) => {
    const {id: userId} = req.params
    const user = await User.findById({_id: userId}).select('-_id -__v')
    if(!user){
        throw new NotFoundError(`user with this id: ${userId} not found`)
    }
    res.status(StatusCodes.OK).json({user})
})
module.exports = {
    createUser,
    login,
    logingoogle,
    handleRefreshToken,
    logout,
    updatePassword,
    getUser,
    forgotPassword,
    resetPassword
}