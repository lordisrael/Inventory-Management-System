const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()
const passport = require('passport')

const { createUser, login, handleRefreshToken, logout, forgotPassword, updatePassword, resetPassword, profile} = require('../controllers/auth')

router.post('/register', createUser)
router.get('/refresh', handleRefreshToken)
router.post('/login', login)
router.get('/google', passport.authenticate('google', { scope:[ 'email', 'profile' ] }))
router.get('/google/redirect', 
    passport.authenticate( 'google', { 
        successRedirect: '/api/v1/auth/google/success', failureRedirect: '/api/v1/auth/google/failure'}))
// router.get('/google/redirect', 
//     passport.authenticate( 'google'), (req, res) => {
//         res.send(req.user)
//     })
// Success 
router.get('/google/success', (req , res) => {
    console.log(req.user);
    if(!req.user)
        return res.redirect('/api/v1/auth/google/failure');
    res.send("Welcome " + req.user.email);
});
  
// failure
router.get('/google/failure' , (req , res) => {
    res.send("Error");
})
router.get('/profile', authMiddleware, profile)
// router.get('/getuser/:id', getUser)
router.get('/logout', logout)
router.post('/forgot', forgotPassword)
router.put('/update-password', authMiddleware, updatePassword)
router.patch('/reset/:token', resetPassword)

module.exports = router