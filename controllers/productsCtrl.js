const asyncHandler = require('express-async-handler')
const Product = require('../models/product')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError } = require('../errors')

const createProduct = asyncHandler(async(req, res) => {
    const products = await Product.create(req.body)
    if(!products) {
        throw new BadRequestError('Fill all information')
    }
    res.status(StatusCodes.CREATED).json(products)
})
const getALLProducts = asyncHandler(async(req, res) => {

})
const getAProducts = asyncHandler(async(req, res) => {
    
})
const updateProducts = asyncHandler(async(req, res) => {

})
const deleteProducts = asyncHandler(async(req, res) => {

})

module.exports = {
    createProduct
}