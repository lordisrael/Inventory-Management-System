const express = require('express')
const router = express.Router()
const { updateDepartment, deleteDepartment, getDepartment, getAllDepartment, createDepartment } = require('../controllers/departCtrl')
const authMiddleware = require('../middleware/authMiddleware')


router.put('/edit', authMiddleware, updateDepartment)
router.post('/create', authMiddleware, createDepartment)
router.delete('/delete/:id', authMiddleware, deleteDepartment)
router.get('/get/:id', authMiddleware, getDepartment)
router.get('/getall', authMiddleware, getAllDepartment)

module.exports = router