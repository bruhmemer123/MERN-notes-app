import User from "../models/User.js";
import { generateToken } from "../config/jwt.js";
import bcrypt from "bcryptjs";

export async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = generateToken(newUser._id);

        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    }
    catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            token,
            user: {
                id: user._id,
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Server error during login" });
    }
}

export async function currentUser(req, res) {
    try {
        res.status(200).json({
            user: {
                id: req.user._id,
                _id: req.user._id,
                username: req.user.username,
                email: req.user.email,
            }
        });
    } catch (error) {
        console.error("Error in currentUser:", error);
        res.status(500).json({ message: "Server error" });
    }
}