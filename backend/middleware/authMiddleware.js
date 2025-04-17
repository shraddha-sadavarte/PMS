import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify JWT token and extract user
export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attaches user { id, role } to request
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// Check if user is admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ error: "Admin access required" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to validate admin role" });
  }
};
