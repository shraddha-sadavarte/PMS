import User from "../models/User.js";

//get all users excluding admin
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({ role: {$ne: "admin" }}).select("username email role"); // only return necessary fields
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Error fetching users" });
    }
  };