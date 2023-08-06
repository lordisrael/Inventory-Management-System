const express = require('express')
const router = express.Router()
const { updateCategory, createCategory, deleteCategory, getCategory, getAllCategory } = require('../controllers/categoryCtrl')
const authMiddleware = require('../middleware/authMiddleware')
const isAdmin = require('../middleware/isAdmin')


router.put('/edit/:id', authMiddleware, isAdmin, updateCategory)
router.post('/create', authMiddleware, isAdmin, createCategory)
router.delete('/delete/:id', authMiddleware, isAdmin, deleteCategory)
router.get('/getall', authMiddleware, isAdmin, getAllCategory)
router.get('/get/:id', authMiddleware, isAdmin, getCategory)

module.exports = router