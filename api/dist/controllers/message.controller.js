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
exports.addMessage = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const addMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUserId = req.userId;
    const chatId = req.params.chatId;
    const text = req.body.text;
    try {
        const chat = yield prisma_1.default.chat.findUnique({
            where: {
                id: chatId,
                userIDs: {
                    hasSome: [tokenUserId],
                },
            },
        });
        if (!chat)
            return res.status(404).json({ message: "Chat not found" });
        const message = yield prisma_1.default.message.create({
            data: {
                text,
                chatId,
                userId: tokenUserId,
            },
        });
        yield prisma_1.default.chat.update({
            where: {
                id: chatId,
            },
            data: {
                seenBy: [tokenUserId],
                lastMessage: text,
            },
        });
        res.status(200).json(message);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to add message" });
    }
});
exports.addMessage = addMessage;
//# sourceMappingURL=message.controller.js.map