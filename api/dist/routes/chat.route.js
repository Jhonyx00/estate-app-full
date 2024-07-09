"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("../controllers/chat.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
router.get("/", verifyToken_1.verifyToken, chat_controller_1.getChats);
router.get("/:id", verifyToken_1.verifyToken, chat_controller_1.getChat);
router.post("/", verifyToken_1.verifyToken, chat_controller_1.addChat);
router.put("/read/:id", verifyToken_1.verifyToken, chat_controller_1.readChat);
exports.default = router;
//# sourceMappingURL=chat.route.js.map