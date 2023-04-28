const Category = require('../models/categoryModel');
const catchAsync = require('./../utils/catchAsync');

exports.createCategory = catchAsync(async (req, res, next) => {
  /* Creating a new tour using the data from the request body. */
  const newCategory = await Category.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      tour: newCategory,
    },
  });
});
