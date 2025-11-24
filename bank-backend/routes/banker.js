const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Banker = require("../models/Banker");
const User = require("../models/User");
const bankerAuth = require("../middleware/bankerAuth");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    if (!employeeId || !password)
      return res.status(400).json({ message: "Employee ID and password required" });

    const banker = await Banker.findOne({ employeeId });

    if (!banker)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await banker.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: banker._id },
      process.env.BANKER_JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, name: banker.name });
  } catch (err) {
    console.error("Banker login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/accounts", bankerAuth, async (req, res) => {
  try {
    const customers = await User.find().select("-password");
    res.json(customers);
  } catch (err) {
    console.error("Fetch accounts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/customers", bankerAuth, async (req, res) => {
  try {
    const customers = await User.find().select("-password");
    res.json(customers);
  } catch (err) {
    console.error("Fetch customers error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/customer/:id/transactions", bankerAuth, async (req, res) => {
  try {
    const userId = req.params.id;

    const transactions = await Transaction.find({ user: userId })
      .sort({ date: -1 });

    res.json({ success: true, transactions });
  } catch (err) {
    console.error("Error fetching customer transactions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
