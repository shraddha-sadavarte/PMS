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

export const getUserById = async (req,res) => {
  try{
    const user = await User.findById(req.params.id).select("-password"); //exclude password
    if(!user) return res.status(404).json({message: "User not found" });

    res.status(200).json(user);
  } catch (error){
    console.error("Error fetching user by ID: ", error);
    res.status(500).json({message: "server error"});
  }
};