import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getChatMessages, getUsersForSidebar, createMessage } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getChatMessages);

router.post("/send/:id", protectRoute, createMessage);

export default router;
