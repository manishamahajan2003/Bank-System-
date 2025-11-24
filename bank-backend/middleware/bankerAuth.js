const jwt = require("jsonwebtoken");
const Banker = require("../models/Banker");

module.exports = async function bankerAuth(req, res, next) {
  try {
    // Check Authorization header exists
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    // Verify banker JWT
    const decoded = jwt.verify(token, process.env.BANKER_JWT_SECRET);

    // Find banker in DB
    const banker = await Banker.findById(decoded.id).select("-password");

    if (!banker) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.banker = banker; 
    next();
  } catch (err) {
    console.error("Banker auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
