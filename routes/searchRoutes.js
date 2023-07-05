const express = require('express')
const router = express.Router()


const { searchProducts } = require('../controllers/searchCtrl')
router.route('/results').get(searchProducts)

module.exports = router