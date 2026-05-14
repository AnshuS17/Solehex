const Order = require('../models/Order');
const User = require('../models/User');

// @POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalPrice } = req.body;
    const order = await Order.create({ user: req.user._id, items, shippingAddress, totalPrice });
    // clear cart
    await User.findByIdAndUpdate(req.user._id, { cart: [] });
    res.status(201).json(order);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// @GET /api/orders/mine
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @GET /api/orders/:id
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin)
      return res.status(403).json({ message: 'Not authorized' });
    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @GET /api/orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort('-createdAt');
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @PUT /api/orders/:id/status (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(order);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

module.exports = { createOrder, getMyOrders, getOrder, getAllOrders, updateOrderStatus };
