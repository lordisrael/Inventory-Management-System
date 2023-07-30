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
    const products = await Product.find()
    res.status(StatusCodes.OK).json(products)
})
const getAProduct = asyncHandler(async(req, res) => {
    const {id: productId} = req.params
    const product = await Product.findById({_id: productId}).populate('department category').select('-_id -__v')
    if(!product){
        throw new NotFoundError(`Products with this id: ${productId} not found`)
    }
    res.status(StatusCodes.OK).json({product})
})
const updateProducts = asyncHandler(async(req, res) => {
    const {id: productId} = req.params
    const product = await Product.findOneAndUpdate({_id: productId}, req.body, { new: true, })
    if(!product){
        throw new NotFoundError(`No product with id: ${productId} found` )
    }
    res.status(StatusCodes.OK).json({product, msg: 'Product updated'})

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
    let totalPrice = 0
    // async function findProductPrice(productId){
    //     const product = await Product.findOne({_id: productId})
    //     if(product){
    //         return product.price
    //     }
    // }
    const productDetails = []
    //const productIds = productsToSell.map(product => product.productID)
    // const productDetails = productsToSell.map(product => {
    //     const price = findProductPrice(product.productID);
    //     return { productId: product.productID, quantity: product.quantity, price: price};
    //   });
    for (const product of productsToSell){
        const {productID, quantity} = product
    const findproduct = await Product.findOne({_id: productID})
    console.log(findproduct.name)
    if(!findproduct) {
        return res.status(404).json('Product not found')
    }
    if(findproduct.quantity < quantity) {
        return res.status(400).json('Insufficient quantity or Product out of stock')
    }
    totalPrice += findproduct.price * quantity
    
    findproduct.quantity -= quantity

    productDetails.push({
        productId: product.productID,
        quantity: product.quantity,
        price: findproduct.price, // Include the price from the product database
        department: findproduct.department

      });
  
    await findproduct.save()
    }

    const transcation = new Transaction({
        sellerId: req.user._id,
        products: productDetails,
        totalPrice : totalPrice,
        timestamp: new Date()
    })
    await transcation.save()
    res.status(StatusCodes.OK).json({msg: 'Products sold successfully'})

})

module.exports = {
    createProduct,
    deleteProduct,
    sellProducts,
    updateProducts,
    getAProduct,
    getALLProducts,
    addquantitytoProduct
}