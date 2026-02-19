const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Cart = require("../models/Cart");
const auth = require("../middleware/authMiddleware");


// ✅ PLACE ORDER
router.post("/", auth, async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const order = new Order({
      userId: req.user,
      items: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    });

    await order.save();

    // Clear cart after placing order
    await Cart.deleteMany({ userId: req.user });

    res.json({ message: "Order Placed Successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order Failed" });
  }
});


// ✅ GET MY ORDERS
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user })
      .populate("items.productId");

    res.json(orders);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fetch Orders Failed" });
  }
});


module.exports = router;
