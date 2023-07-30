const Product = require('../models/product')
const Transaction = require('../models/transaction.js')
const asyncHandler = require('express-async-handler')
const {StatusCodes} = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getATransaction = asyncHandler(async(req, res) => {
    const {id: transactionId} = req.params
    const transaction = await Transaction.findById({_id: transactionId})
    if(!transaction){
        throw new NotFoundError(`Transaction with this id: ${transactionID} not found`)
    }
    res.status(StatusCodes.OK).json({transaction})
})

const getAllTransaction = asyncHandler(async(req, res) => {
    const transaction = await Transaction.find()
    if(!transaction){
        throw new NotFoundError('Transactions not found')
    }
    res.status(StatusCodes.OK).json(transaction)

})

const getTransactionWeek = asyncHandler(async(req, res) => {
    const currentDate = new Date()
    const weekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)
    const transaction = await Transaction.find({
        transactionDate: {
            $gte: weekAgo,
            $lte: currentDate
        }
    })
    if(!transaction) {
        throw new NotFoundError('No transaction made within this period')
    }
    res.status(StatusCodes.OK).json(transaction)
}) 

const getTransactionMonth = asyncHandler(async(req, res) => {
    const currentDate = new Date()
    const monthAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000)
    const transaction = await Transaction.find({
        transactionDate: {
            $gte: monthAgo,
            $lte: currentDate
        }
    })
    if(!transaction) {
        throw new NotFoundError('No transaction made within this period')
    }
    res.status(StatusCodes.OK).json(transaction)
}) 

const deleteTransaction = asyncHandler(async(req, res) => {
    const {id: transactionId} = req.params
    const transaction = await Transaction.findByIdAndDelete({_id: transactionId})
    if(!transaction){
        throw new NotFoundError(`Transaction with this id: ${transactionID} not found`)
    }
    res.status(StatusCodes.OK).json({msg: "Deleted"})
})

const topThreeProducts = asyncHandler(async(req, res) => {
    const pipeLine = [
        {$unwind: '$products'},
        {$group: { _id: '$products.productId', 
        totalSales: {$sum: '$products.quantity'},
        totalPrice: { $sum: { $multiply: ['$products.price', '$products.quantity']}}
        }},
        
        {$sort: {totalPrice: -1}},
        {$limit: 3}
    ]
    const topProducts = await Transaction.aggregate(pipeLine)

    res.status(StatusCodes.OK).json(topProducts)
})

const topThreeDepartments = asyncHandler(async(req, res) =>{
    const topDepartment = await Transaction.aggregate([
        {$unwind: '$products'},
        {$group: {_id: '$products.department',  
        totalSales: {$sum: { $multiply: ['$products.price', '$products.quantity']}}
        }},
        {$sort: {totalSales: -1}},
        {$limit: 3}
    ])
    res.status(200).json(topDepartment)
})



module.exports ={
    getATransaction,
    getAllTransaction,
    getTransactionWeek,
    getTransactionMonth,
    topThreeProducts,
    deleteTransaction,
    topThreeDepartments
}