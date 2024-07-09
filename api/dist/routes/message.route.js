"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_controller_1 = require("../controllers/message.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
router.post("/:chatId", verifyToken_1.verifyToken, message_controller_1.addMessage);
exports.default = router;
//# sourceMappingURL=message.route.js.map