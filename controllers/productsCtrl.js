const asyncHandler = require('express-async-handler')
const Product = require('../models/product')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const createProduct = asyncHandler(async(req, res) => {
    const products = await Product.create(req.body)
    if(!products) {
        throw new BadRequestError('Fill all information')
    }
    res.status(StatusCodes.CREATED).json(products)
})
const getALLProducts = asyncHandler(async(req, res) => {

})
const getAProduct = asyncHandler(async(req, res) => {
    const {id: productId} = req.params
    const product = await Product.findById({_id: productId})
    if(!product){
        throw new NotFoundError(`Products with this id: ${productsID} not found`)
    }
    res.status(StatusCodes.OK).json({product})
})
const updateProducts = asyncHandler(async(req, res) => {

})
const deleteProducts = asyncHandler(async(req, res) => {

})

const addquantitytoProduct = asyncHandler(async(req, res)=> {
    const {id: ProductId} = req.params
    const {quantity} = req.body
    const product = await Product.findById({_id: ProductId})
    product.quantity += quantity
    await product.save()
    res.status(StatusCodes.OK).json('Quantity added')
})

const sellProducts = asyncHandler(async(req, res) => {
    const productsToSell = req.body
    if(!Array.isArray(productsToSell)) {
        return res.status(400).json('Invalid format')
    }
    for (const product of productsToSell){
        const {sku, quantity} = product
    const findproduct = await Product.findOne({sku})
    console.log(findproduct.name)
    if(!findproduct) {
        return res.status(404).json('Product with not found')
    }
    if(findproduct.quantity < quantity) {
        return res.status(400).json('Insufficient quantity or Product out of stock')
    }
    findproduct.quantity -= quantity
    await findproduct.save()
    }
    res.status(StatusCodes.OK).json('Products sold successfully')

})

module.exports = {
    createProduct,
    sellProducts,
    getAProduct,
    addquantitytoProduct
}