const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Create app FIRST
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);   // ✅ FIXED HERE

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/groceryDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("DB Connection Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Start Server
app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});
