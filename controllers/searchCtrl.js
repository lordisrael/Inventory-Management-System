const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const {StatusCodes} = require('http-status-codes')

const searchProducts = asyncHandler(async(req, res) => {
    const {sku, name, department, category, brand, sort, fields} = req.query
    const queryObject = {}
    if(sku){
        queryObject.sku = {$regex: sku, $options: 'i'}
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    if(brand){
        queryObject.brand = {$regex: brand, $options: 'i'}
    }
    if(department) {
        queryObject.department = department
    }
    if(category){
        queryObject.category = category
    }
    let result = Product.find(queryObject)
    
    if(sort){
        const sortList = sort.split(',').join('')
        result = result.sort(sortList)
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limitSize = Number(req.query.limit) || 10
    const skipCount = (page - 1) * limitSize

    result = result.skip(skipCount).limit(limitSize)
    const products = await result.select('sku name price quantity')

    res.status(StatusCodes.OK).json({products, nbHits: products.length})
})

module.exports = {
    searchProducts
}

/*
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');

const searchProducts = asyncHandler(async (req, res) => {
  const { sku, name, department, category, brand, sort, fields } = req.query;
  const queryObject = {};

  if (sku) {
    queryObject.sku = { $regex: sku, $options: 'i' };
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  if (brand) {
    queryObject.brand = { $regex: brand, $options: 'i' };
  }
  if (department) {
    queryObject.department = department;
  }
  if (category) {
    queryObject.category = category;
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limitSize = Number(req.query.limit) || 10;
  const skipCount = (page - 1) * limitSize;

  result = result.skip(skipCount).limit(limitSize);

  const products = await result.select('sku name price quantity').exec();
  const nbHits = products.length;

  res.status(StatusCodes.OK).json({ products, nbHits });
});

module.exports = {
  searchProducts,
};
*/