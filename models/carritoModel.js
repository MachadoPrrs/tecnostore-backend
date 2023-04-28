const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const carritoSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  fabricante: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  ratingsAverage: {
    type: Number,
  },
  price: {
    type: String,
  },
  priceDiscount: {
    type: String,
  },
  photo: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;
