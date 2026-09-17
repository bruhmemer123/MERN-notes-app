import express from "express";
import { registerUser, loginUser, currentUser, logoutUser } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js"
import { createRateLimiter } from "../middleware/rateLimiter.js";
import { authRateLimit } from "../config/upstash.js";

const router = express.Router()

const authLimiter = createRateLimiter(authRateLimit)

router.post("/register", authLimiter, registerUser)
router.post("/login", authLimiter, loginUser)
router.get("/me", protectRoute, currentUser)
router.post("/logout", logoutUser)

export default router