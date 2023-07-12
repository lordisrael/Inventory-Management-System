const Product = require('../models/product')
const Transaction = require('../models/transaction.js')
const asyncHandler = require('express-async-handler')
const {StatusCodes} = require('http-status-codes')
const {} = require('../errors')

const getATransaction = asyncHandler(async(req, res) => {
    const {id: transactionId} = req.params
    const transaction = await Transaction.findById({_id: transactionId})
    if(!transaction){
        throw new NotFoundError(`Transaction with this id: ${transactionID} not found`)
    }
    res.status(StatusCodes.OK).json({transaction})
})

module.exports ={
    getATransaction
}