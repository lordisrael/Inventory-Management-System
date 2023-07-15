const asyncHandler = require('express-async-handler')
const Product = require('../models/product')
const Transaction = require('../models/transaction')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const transaction = require('../models/transaction')

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
    const product = await Product.findById({_id: productId}).populate('department category').select('-_id -__v')
    if(!product){
        throw new NotFoundError(`Products with this id: ${productID} not found`)
    }
    res.status(StatusCodes.OK).json({product})
})
const updateProducts = asyncHandler(async(req, res) => {

})
const deleteProduct = asyncHandler(async(req, res) => {
    const {id: productID} = req.params
    const products = await Product.findByIdAndDelete({_id: productID})
    if(!products) {
        throw new NotFoundError(`Product with id: ${productID} not found`)
    } 
    res.status(StatusCodes.OK).json({msg: "Deleted"})
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
    //const transactionId = []
    let totalPrice = 0
    //const productIds = productsToSell.map(product => product.productID)
    const productDetails = productsToSell.map(product => {
        return { productId: product.productID, quantity: product.quantity };
      });
    for (const product of productsToSell){
        const {productID, quantity} = product
    const findproduct = await Product.findOne({_id: productID})
    console.log(findproduct.name)
    if(!findproduct) {
        return res.status(404).json('Product with not found')
    }
    if(findproduct.quantity < quantity) {
        return res.status(400).json('Insufficient quantity or Product out of stock')
    }
    totalPrice += findproduct.price * quantity
    const transcation = new Transaction({
        //productId: productIds,
        sellerId: req.user._id,
        products: productDetails,
        //quantity,
        totalPrice : totalPrice,
        timestamp: new Date()
    })
    await transcation.save()
    //const transac = transactionId.push(transaction._id)
    findproduct.quantity -= quantity
    await findproduct.save()
    }
    res.status(StatusCodes.OK).json({msg: 'Products sold successfully'})

})

module.exports = {
    createProduct,
    deleteProduct,
    sellProducts,
    getAProduct,
    addquantitytoProduct
}