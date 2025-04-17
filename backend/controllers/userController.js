import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, "_id username"); // only return necessary fields
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Error fetching users" });
    }
  };