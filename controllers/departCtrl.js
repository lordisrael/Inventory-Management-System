const Department = require('../models/department')
const Product = require('../models/product')
const {NotFoundError} = require('../errors')
const asyncHandler = require('express-async-handler') 
const {StatusCodes} = require('http-status-codes')

const createDepartment = asyncHandler(async(req, res) => {
    const department = await Department.create(req.body)
    res.status(StatusCodes.CREATED).json({msg: 'Created', department})
})

const deleteDepartment = asyncHandler(async(req, res) => {
    const {id: departmentId} = req.params
    const department = await Department.findByIdAndDelete({_id: departmentId})
    if(!department) {
        throw new NotFoundError(`department with id: ${departmentId} not found`)
    }
    res.status(StatusCodes.OK).json({msg: "deleted"})
})
const updateDepartment = asyncHandler(async(req, res) => {
    const {id: departmentId} = req.params
    const department = await Department.findByIdAndUpdate({_id:departmentId}, req.body, { new: true})
    if(!department) {
        throw new NotFoundError(`Blog with id: ${departmentId} not found`)
    }
    res.status(StatusCodes.OK).json({msg: "Updated",department})
})
const getDepartment = asyncHandler(async(req, res) => {
    const {id: departmentId} = req.params
    const department = await Department.findById({_id: departmentId}).select('-__id -__v')
    if(!department) {
        throw new NotFoundError(`No department with id: ${departmentId} found`)
    }
    const product = await Product.find({department: departmentId}).select('sku name brand quantity category')
    res.status(StatusCodes.OK).json({department, msg: 'This are products under this department', nbHits: product.length, product})

})
const getAllDepartment = asyncHandler(async(req, res) => {
    const department = await Department.find()
    res.status(StatusCodes.OK).json({department})

})

module.exports = {
    createDepartment,
    deleteDepartment,
    updateDepartment,
    getDepartment,
    getAllDepartment
}
