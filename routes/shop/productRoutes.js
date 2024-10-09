const express = require('express');


const { getFilteredProducts, getProductDetails } = require('../../controllers/shop/shop-controller')

const router = express.Router();

router.get('/get-products', getFilteredProducts);
router.get('/get-products/:id', getProductDetails);

module.exports = router;