const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

const { createUser, login, handleRefreshToken, logout, forgotPassword, updatePassword, resetPassword} = require('../controllers/auth')

router.post('/register', createUser)
router.get('/refresh', handleRefreshToken)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgot', forgotPassword)
router.put('/update-password', authMiddleware, updatePassword)
router.patch('/reset/:token', resetPassword)

module.exports = router