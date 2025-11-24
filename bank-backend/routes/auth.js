const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// helper to create account number
const generateAccountNumber = () => {
  // simple random 10-digit number
  return String(Math.floor(1000000000 + Math.random() * 9000000000));
};

// create jwt and set cookie
const createSendToken = (user, res) => {
  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  };

  res.cookie("token", token, cookieOptions);
  return token;
};

// Register
router.post("/register", async (req, res) => {
  try {
    const { fullName, mobile, aadhar, address, password } = req.body;
    if (!fullName || !mobile || !aadhar || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await User.findOne({ mobile });
    if (exists) return res.status(400).json({ message: "Mobile already registered" });

    // ensure unique account number
    let acc;
    let existsAcc;
    do {
      acc = generateAccountNumber();
      existsAcc = await User.findOne({ accountNumber: acc });
    } while (existsAcc);

    const user = new User({
      fullName,
      mobile,
      aadhar,
      address,
      accountNumber: acc,
      password
    });

    await user.save();

    res.status(201).json({ message: "Account created successfully. Please login." });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { mobile, password } = req.body;
    if (!mobile || !password) return res.status(400).json({ message: "Mobile and password required" });

    const user = await User.findOne({ mobile });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = createSendToken(user, res);
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
  res.json({ message: "Logged out" });
});

module.exports = router;
