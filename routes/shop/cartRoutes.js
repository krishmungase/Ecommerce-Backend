const express = require('express');

const { addToCart, fetchCartItems, updateCartItemQty, deleteCartItem } = require('../../controllers/shop/cart-controller')

const router = express.Router();

router.post('/add-to-cart', addToCart);
router.get('/get/:userId', fetchCartItems);
router.delete('/:userId/:productId', deleteCartItem);
router.put('/update-cart', updateCartItemQty);

module.exports = router;