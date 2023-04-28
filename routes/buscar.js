const express = require('express');

const { searchProduct } = require('../controllers/buscarController');

const router = express.Router();

router.get('/:coleccion/:termino', searchProduct);

module.exports = router;
