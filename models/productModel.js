const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: [true, 'A product must have a name'],
    trim: true,
    maxlength: [
      200,
      'A product name must have les or equal then 200 characters',
    ],
    minlength: [5, 'A product name must have more or equal then 5 characters'],
    // validate: {
    //   validator: function (value) {
    //     return validator.isAlpha(value.split(' ').join(''));
    //   },
    //   message: 'Product name must only contain characters.',
    // },
  },
  fabricante: {
    type: String,
    required: [true, 'A product must have a fabricante'],
  },
  descripcion: {
    type: String,
    required: [true, 'A product must have a descripcion'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'product must be above 1.0'],
    max: [5, 'product must be below 5.0'],
  },
  price: {
    type: String,
    required: [true, 'A product must have a price'],
  },
  priceDiscount: {
    type: String,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price',
    },
  },
  photo: {
    type: String,
    default: 'no-image.jpg',
    required: [true, 'A product must have an image'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Category',
  //   required: true,
  // },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
