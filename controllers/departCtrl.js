const Department = require('../models/department')
const {} = require('../errors')
const asyncHandler = require('express-async-handler') 
const {StatusCodes} = require('http-status-codes')

const createDepartment = asyncHandler(async(req, res) => {

})

module.exports = {
    createDepartment
}
