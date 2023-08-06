const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

const { getATransaction, getTransactionWeek, topThreeProducts, deleteTransaction, getAllTransaction, getTransactionMonth, topThreeDepartments } = require('../controllers/transactionCtrl')
const isAdmin = require('../middleware/isAdmin')

router.get('/get-atransaction/:id', authMiddleware, getATransaction)
router.get('/week', authMiddleware, isAdmin, getTransactionWeek)
router.get('/month', authMiddleware, isAdmin, getTransactionMonth)
router.get('/department', authMiddleware, isAdmin,topThreeDepartments)
router.get('/top3', authMiddleware, isAdmin, topThreeProducts)
router.delete('/delete/:id', authMiddleware, isAdmin, deleteTransaction)
router.get('/', authMiddleware, isAdmin, getAllTransaction)

module.exports = router