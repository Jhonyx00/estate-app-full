"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_controller_1 = require("../controllers/test.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
router.get("/should-be-logged-in", verifyToken_1.verifyToken, test_controller_1.shouldBeLoggedIn);
router.get("/should-be-admin", test_controller_1.shouldBeAdmin);
exports.default = router;
//# sourceMappingURL=test.route.js.map