const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Transaction = require("../models/Transaction");

// GET /api/transactions - list for current user
router.get("/", auth, async (req, res) => {
  try {
    const txns = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
    res.json({ transactions: txns });
  } catch (err) {
    console.error("Get transactions:", err);
    res.status(500).json({ message: "Server error" });
  }
});


const computeBalance = async (userId) => {
  const txns = await Transaction.find({ user: userId });
  let bal = 0;
  txns.forEach(t => {
    bal += t.type === "Deposit" ? t.amount : -t.amount;
  });
  return bal;
};


router.post("/", auth, async (req, res) => {
  try {
    const { type, amount } = req.body;
    if (!type || !amount || !["Deposit", "Withdraw"].includes(type)) {
      return res.status(400).json({ message: "Invalid transaction" });
    }
    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) {
      return res.status(400).json({ message: "Amount must be positive number" });
    }

    if (type === "Withdraw") {
      const bal = await computeBalance(req.user._id);
      if (amt > bal) {
        return res.status(400).json({ message: "Insufficient funds" });
      }
    }

    const txn = new Transaction({
      user: req.user._id,
      type,
      amount: amt
    });
    await txn.save();
    res.status(201).json({ transaction: txn });
  } catch (err) {
    console.error("Create txn:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
