"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
router.get("/", user_controller_1.getUsers);
// router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken_1.verifyToken, user_controller_1.updateUser);
router.delete("/:id", verifyToken_1.verifyToken, user_controller_1.deleteUser);
router.post("/save", verifyToken_1.verifyToken, user_controller_1.savePost);
router.get("/profilePosts", verifyToken_1.verifyToken, user_controller_1.profilePosts);
router.get("/notification", verifyToken_1.verifyToken, user_controller_1.getNotificationNumber);
exports.default = router;
//# sourceMappingURL=user.route.js.map