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
exports.readChat = exports.addChat = exports.getChat = exports.getChats = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUserId = req.userId;
    try {
        const chats = yield prisma_1.default.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenUserId],
                },
            },
        });
        let receiver;
        for (const chat of chats) {
            const receiverId = chat.userIDs.find((id) => id !== tokenUserId); //the other user
            receiver = yield prisma_1.default.user.findUnique({
                where: {
                    id: receiverId,
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                },
            });
        }
        res.status(200).json({ chats, receiver });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get chats" });
    }
});
exports.getChats = getChats;
const getChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUserId = req.userId;
    try {
        const chat = yield prisma_1.default.chat.findUnique({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId],
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
        yield prisma_1.default.chat.update({
            where: {
                id: req.params.id,
            },
            data: {
                seenBy: {
                    push: [tokenUserId],
                },
            },
        });
        res.status(200).json(chat);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get chat" });
    }
});
exports.getChat = getChat;
const addChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUserId = req.userId;
    try {
        const newChat = yield prisma_1.default.chat.create({
            data: {
                userIDs: [tokenUserId, req.body.receiverId],
            },
        });
        res.status(200).json(newChat);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to add chat" });
    }
});
exports.addChat = addChat;
const readChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUserId = req.userId;
    try {
        const chat = yield prisma_1.default.chat.update({
            where: {
                id: req.params.id,
                userIDs: {
                    hasSome: [tokenUserId],
                },
            },
            data: {
                seenBy: {
                    set: [tokenUserId],
                },
            },
        });
        res.status(200).json(chat);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to read chat" });
    }
});
exports.readChat = readChat;
//# sourceMappingURL=chat.controller.js.map