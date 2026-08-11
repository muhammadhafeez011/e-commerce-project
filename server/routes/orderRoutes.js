const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Create new order
router.post("/", async (req, res) => {
  try {
    const { userEmail, items, total } = req.body;
    const newOrder = new Order({ userEmail, items, total });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get orders for a user
router.get("/:email", async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.email }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
