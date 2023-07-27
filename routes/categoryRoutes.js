const express = require('express')
const router = express.Router()
const { updateCategory, createCategory, deleteCategory, getCategory, getAllCategory } = require('../controllers/categoryCtrl')
const authMiddleware = require('../middleware/authMiddleware')


router.put('/edit/:id', authMiddleware, updateCategory)
router.post('/create', authMiddleware, createCategory)
router.delete('/delete/:id', authMiddleware, deleteCategory)
router.get('/getall', authMiddleware, getAllCategory)
router.get('/get/:id', authMiddleware, getCategory)

module.exports = router