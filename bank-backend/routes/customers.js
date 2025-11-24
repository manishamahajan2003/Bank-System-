const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// return current user (without password)
router.get("/me", auth, async (req, res) => {
  const user = req.user.toObject();
  delete user.password;
  res.json(user);
});

module.exports = router;
