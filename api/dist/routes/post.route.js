"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../middleware/verifyToken");
const post_controller_1 = require("../controllers/post.controller");
const router = (0, express_1.default)();
router.get("/", post_controller_1.getPosts);
router.get("/:id", post_controller_1.getPost);
router.post("/", verifyToken_1.verifyToken, post_controller_1.addPost);
router.put("/:id", verifyToken_1.verifyToken, post_controller_1.updatePost);
router.delete("/:id", verifyToken_1.verifyToken, post_controller_1.deletePost);
exports.default = router;
//# sourceMappingURL=post.route.js.map