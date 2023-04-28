const catchAsync = require('./../utils/catchAsync');
const Product = require('../models/productModel');

const coleccionesDB = ['products'];

exports.searchProduct = catchAsync(async (req, res, next) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesDB.includes(coleccion)) {
    return res.status(400).json({
      msg: 'Products es la unica coleccion permitida',
    });
  }

  const regex = new RegExp(termino, 'i');
  const productos = await Product.find({
    name: regex,
  }).populate('category', 'name');

  res.status(200).json({
    results: productos,
  });
});
