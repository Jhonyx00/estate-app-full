"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldBeAdmin = exports.shouldBeLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const shouldBeLoggedIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.userId);
    res.status(200).json({ message: "You Are Authenticated" });
});
exports.shouldBeLoggedIn = shouldBeLoggedIn;
const shouldBeAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({ message: "Not Authenticated" });
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return res.status(403).json({ message: "Token is not valid" });
        if (!payload.isAdmin)
            return res.status(403).json({ message: "Not Authorized" });
    }));
    res.status(200).json({ message: "You Are Authenticated" });
});
exports.shouldBeAdmin = shouldBeAdmin;
//# sourceMappingURL=test.controller.js.map