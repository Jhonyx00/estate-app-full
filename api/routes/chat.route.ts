import express from "express";
import {
  getChat,
  getChats,
  addChat,
  readChat,
} from "../controllers/chat.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/:id", verifyToken, getChat);
router.post("/", verifyToken, addChat);
router.put("/read/:id", verifyToken, readChat);

export default router;
