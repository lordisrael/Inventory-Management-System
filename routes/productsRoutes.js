const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

const { createProduct, sellProducts, getAProduct, addquantitytoProduct } = require('../controllers/productsCtrl')
const auth = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, createProduct)
router.post('/sell', authMiddleware, sellProducts)
router.get('/get-aproduct/:id', authMiddleware, getAProduct)
router.put('/add/:id', authMiddleware, addquantitytoProduct)

module.exports = router