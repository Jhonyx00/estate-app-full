import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller";

const router = express();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
