const express = require('express');

const {
  getAllProducts,
  createProduct,
  uploadProductPhoto,
  getProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productController');

const router = express.Router();

router.route('/').get(getAllProducts).post(uploadProductPhoto, createProduct);
router.route('/:id').get(getProduct).delete(deleteProduct).patch(updateProduct);

module.exports = router;
