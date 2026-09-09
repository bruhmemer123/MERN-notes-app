import express from "express"
import { createNote, deleteNote, getAllNotes, updateNote, getNote } from "../controllers/notesController.js"
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router()

router.use(protectRoute);

router.get("/", getAllNotes)
router.get("/:id", getNote)
router.post("/", createNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router