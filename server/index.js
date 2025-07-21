const express = require("express");
const app = express();

// ✅ Import mongoose
const mongoose = require("mongoose");

// Load config from .env file
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const dbConnect = require("./config/database");
dbConnect();


// Run seeding when DB is connected
mongoose.connection.once("open", () => {
  console.log("✅ MongoDB connected");
});

// Middleware
const cors = require("cors");
app.use(cors({
  origin: "https://papaya-stardust-91ef3b.netlify.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Routes
const userRoutes = require("./routes/user");

app.use("/", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Hello VK!!");
});

// Start server
app.listen(PORT, () => {
  console.log(` Server started on http://localhost:${PORT}`);
});
