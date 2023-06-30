const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

const { createUser, login, handleRefreshToken, logout} = require('../controllers/auth')

router.post('/register', createUser)
router.get('/refresh', handleRefreshToken)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router