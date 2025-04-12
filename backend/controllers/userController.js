import User from "../models/User.js";

export const getUsers = async (req, res) => {
    const users = await User.find( {role: "user"});
    res.json(users);
}