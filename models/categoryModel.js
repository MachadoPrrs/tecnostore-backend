const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A product category must have a name'],
    trim: true,
    maxlength: [
      40,
      'A product category name must have les or equal then 40 characters',
    ],
    minlength: [
      5,
      'A product category name must have more or equal then 5 characters',
    ],
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
