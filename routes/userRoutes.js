const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

const { createUser} = require('../controllers/auth')

router.post('/register', createUser)

module.exports = router