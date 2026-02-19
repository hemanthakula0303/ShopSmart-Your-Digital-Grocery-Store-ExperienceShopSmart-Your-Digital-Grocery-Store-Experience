const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: "Product Added Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;