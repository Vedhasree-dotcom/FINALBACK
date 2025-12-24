const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "No token" });
    }

    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing authorization" });
    }

    const token = header.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    res.status(500).json({ message: "Server error in auth middleware" });
  }
};

const adminOnly = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { protect, adminOnly };
