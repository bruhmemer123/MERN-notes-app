import express from "express";
import { registerUser, loginUser, currentUser, logoutUser } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js"
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/me", protectRoute, currentUser)
router.post("/logout", logoutUser)

export default router