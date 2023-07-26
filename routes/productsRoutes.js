const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const isSeller = require('../middleware/isSeller')
const isAdmin = require('../middleware/isAdmin')
const router = express.Router()

const { createProduct, sellProducts, getAProduct, addquantitytoProduct, deleteProduct } = require('../controllers/productsCtrl')
const auth = require('../middleware/authMiddleware')

router.post('/create', authMiddleware,isAdmin, createProduct)
router.post('/sell', authMiddleware, isSeller,  sellProducts)
router.get('/get-aproduct/:id', authMiddleware, getAProduct)
router.delete('/delete/:id', authMiddleware, isAdmin, deleteProduct)
router.put('/add/:id', authMiddleware,isAdmin, addquantitytoProduct)

module.exports = router