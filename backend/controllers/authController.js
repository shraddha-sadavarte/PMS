import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req,res) => {
    try{
        const { username, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({username, email, password: hashedPassword, role});
        await newUser.save();
        res.status(201).json({message : "User Registered"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

export const login = async(req,res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid Credentials"});

        const accessToken = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({accessToken, role: user.role});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};