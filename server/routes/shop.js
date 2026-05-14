const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const { createOrder, getMyOrders, getOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

// Cart
router.get('/cart', protect, getCart);
router.post('/cart', protect, addToCart);
router.put('/cart/:productId', protect, updateCartItem);
router.delete('/cart/:productId', protect, removeFromCart);

// Orders
router.post('/orders', protect, createOrder);
router.get('/orders/mine', protect, getMyOrders);
router.get('/orders/all', protect, admin, getAllOrders);
router.get('/orders/:id', protect, getOrder);
router.put('/orders/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
