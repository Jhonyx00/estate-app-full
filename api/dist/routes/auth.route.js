"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controler_1 = require("../controllers/auth.controler");
const router = express_1.default.Router();
router.post("/register", auth_controler_1.register);
router.post("/login", auth_controler_1.login);
router.post("/logout", auth_controler_1.logout);
exports.default = router;
//# sourceMappingURL=auth.route.js.map