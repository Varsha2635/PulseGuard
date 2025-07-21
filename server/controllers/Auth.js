const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const OTP = require("../models/OTP");
const mailSender = require("../utils/sendMail");
const otpGenerator = require("otp-generator");
require("dotenv").config();

// Send OTP to Email
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    // Generate 6-digit OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // Save OTP in DB
    await OTP.create({ email, otp });

    // Send email
    await mailSender(
      email,
      "Pulse Guard OTP Verification",
      `<h3>Your OTP is: ${otp}</h3><p>Valid for 5 minutes</p>`
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("Error sending OTP:", err);
    return res.status(500).json({
      success: false,
      message: "Error while sending OTP",
    });
  }
};

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    // Check if OTP matches
    const recentOtpEntry = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!recentOtpEntry || recentOtpEntry.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
    };

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      const userObj = user.toObject();
      userObj.token = token;
      userObj.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,       // Required for HTTPS (Render uses HTTPS)
        sameSite: "None", 
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user: userObj,
        message: "User Logged in successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};
