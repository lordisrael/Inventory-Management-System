const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

const { getATransaction } = require('../controllers/transactionCtrl')

router.get('/get-atransaction/:id', authMiddleware, getATransaction)

module.exports = router