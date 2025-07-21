const express = require("express");
const router = express.Router();
const { sendOTP, signup, login } = require("../controllers/Auth");
const { authenticateUser } = require("../middleware/auth");

// Routes
router.post("/send-otp", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

// Optionally protected route
router.get("/profile", authenticateUser, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
    message: "Access granted to protected route",
  });
});

module.exports = router;
