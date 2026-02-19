const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const auth = require("../middleware/authMiddleware");

// ✅ Add to Cart
router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cartItem = new Cart({
      userId: req.user,
      productId,
      quantity
    });

    await cartItem.save();

    res.json({ message: "Added to cart successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cart Error" });
  }
});

// ✅ Get My Cart
router.get("/", auth, async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user })
      .populate("productId");

    res.json(cartItems);

  } catch (error) {
    res.status(500).json({ message: "Fetch Cart Error" });
  }
});

// ✅ Remove Item From Cart  (NEW FEATURE)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete Failed" });
  }
});

module.exports = router;
