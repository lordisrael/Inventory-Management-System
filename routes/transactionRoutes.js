const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

const { getATransaction, getTransactionWeek, topThreeProducts, deleteTransaction, getAllTransaction, getTransactionMonth, topThreeDepartments } = require('../controllers/transactionCtrl')
const isAdmin = require('../middleware/isAdmin')

router.get('/get-atransaction/:id', authMiddleware, getATransaction)
router.get('/week', authMiddleware, getTransactionWeek)
router.get('/month', authMiddleware, getTransactionMonth)
router.get('/department', authMiddleware, topThreeDepartments)
router.get('/top3', authMiddleware, topThreeProducts)
router.delete('/delete/:id', authMiddleware, deleteTransaction)
router.get('/', authMiddleware, getAllTransaction)

module.exports = router