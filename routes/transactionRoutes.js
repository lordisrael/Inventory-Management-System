const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

const { getATransaction, getTransactionWeek } = require('../controllers/transactionCtrl')

router.get('/get-atransaction/:id', authMiddleware, getATransaction)
router.get('/week', authMiddleware, getTransactionWeek)

module.exports = router