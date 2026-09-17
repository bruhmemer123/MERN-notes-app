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

        res.cookie("jwt", token, {
            httpOnly: true, // Prevents client-side JS from reading the cookie (XSS protection)
            secure: process.env.NODE_ENV === "production", // Sent only over HTTPS in production
            sameSite: "strict", // Prevents CSRF attacks
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }
        )

        res.status(201).json({
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

        res.cookie("jwt", token, {
            httpOnly: true, // Prevents client-side JS from reading the cookie (XSS protection)
            secure: process.env.NODE_ENV === "production", // Sent only over HTTPS in production
            sameSite: "strict", // Prevents CSRF attacks
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }
        )

        res.status(200).json({
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

export async function logoutUser(req, res) {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
        });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}