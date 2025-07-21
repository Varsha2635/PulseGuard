const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // expires in 5 min
});

module.exports = mongoose.model("OTP", OTPSchema);
