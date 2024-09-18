const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller')

router.post('/getProductDetails',controller.getproduct);
router.get('/detailsById', controller.productsById);

module.exports = router;
