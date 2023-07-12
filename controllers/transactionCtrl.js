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

module.exports ={
    getATransaction,
    getAllTransaction,
    getTransactionWeek
}