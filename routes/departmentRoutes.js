const express = require('express')
const router = express.Router()
const { updateDepartment, deleteDepartment, getDepartment, getAllDepartment, createDepartment } = require('../controllers/departCtrl')
const authMiddleware = require('../middleware/authMiddleware')
const isAdmin = require('../middleware/isAdmin')


router.put('/edit/:id', authMiddleware, isAdmin, updateDepartment)
router.post('/create', authMiddleware,isAdmin, createDepartment)
router.delete('/delete/:id', authMiddleware,isAdmin, deleteDepartment)
router.get('/get/:id', authMiddleware, isAdmin, getDepartment)
router.get('/getall', authMiddleware, isAdmin, getAllDepartment)

module.exports = router