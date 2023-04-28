const Carrito = require('../models/carritoModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');

exports.getAllCarts = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Obtener el token de autenticación de la cabecera

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar la validez del token
    const userId = decoded.id;
    console.log(userId);

    const carritos = await Carrito.find({ user: userId });

    res.status(200).json({
      status: 'success',
      results: carritos.length,
      data: {
        carritos,
      },
    });
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
      message: 'Token inválido',
    });
  }
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createCart = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    'name',
    'fabricante',
    'descripcion',
    'photo',
    'price',
    'category',
    'user'
  );
  // if (req.file) filteredBody.photo = req.file.filename;
  const newProduct = await Carrito.create(filteredBody);

  res.status(201).json({
    status: 'success',
    data: {
      cart: newProduct,
    },
  });
});

exports.deleteCart = catchAsync(async (req, res, next) => {
  const carrito = await Carrito.findByIdAndDelete(req.params.id);

  if (!carrito) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deleteAll = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const carrito = await Carrito.deleteMany({ user: userId });
    if (carrito.deletedCount === 0) {
      return next(new AppError('No items found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: 'Token inválido',
    });
  }
});
