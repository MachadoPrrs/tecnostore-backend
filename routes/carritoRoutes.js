const express = require('express');

const {
  getAllCarts,
  createCart,
  deleteCart,
  deleteAll,
} = require('../controllers/carritoController');

const router = express.Router();

router.route('/').get(getAllCarts).post(createCart);

router.route('/deleteAll').delete(deleteAll);
router.route('/:id').delete(deleteCart);

module.exports = router;
