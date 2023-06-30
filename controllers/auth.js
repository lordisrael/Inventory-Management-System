const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')
const asyncHandler = require('express-async-handler')
const { createJWT } = require('../config/jwt')
const {createRefreshJWT} = require('../config/refreshjwt')
const { ConflictError, UnauthenticatedError, NotFoundError } = require('../errors')

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
        res.status(StatusCodes.OK).json({msg: 'You password has been updated',updatePassword})
    } else {
        throw new BadRequestError('Fill in your password')
    }
}) 

const forgotPassword = asyncHandler(async(req, res) => {
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
        throw new NotFoundError('No user with this given email')
    }
})
module.exports = {
    createUser,
    login,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPassword
}