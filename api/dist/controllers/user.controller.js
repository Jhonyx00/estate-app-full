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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationNumber = exports.profilePosts = exports.savePost = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany();
        res.status(200).json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get users" });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { id },
        });
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get user" });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const tokenUserId = req.userId; //from verify token, in payload
    const _a = req.body, { password, avatar } = _a, inputs = __rest(_a, ["password", "avatar"]);
    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized" });
    }
    let updatedPassword = null;
    try {
        if (password) {
            updatedPassword = yield bcrypt_1.default.hash(password, 10);
        }
        const updatedUser = yield prisma_1.default.user.update({
            where: { id },
            data: Object.assign(Object.assign(Object.assign({}, inputs), (updatedPassword && { password: updatedPassword })), (avatar && { avatar })),
        });
        const { password: userPassword } = updatedUser, rest = __rest(updatedUser, ["password"]);
        res.status(200).json(rest);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update user" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const tokenUserId = req.userId; //from verify token, in payload
    if (id !== tokenUserId) {
        return res.status(403).json({ message: "Not Authorized" });
    }
    try {
        yield prisma_1.default.user.delete({
            where: id,
        });
        return res.status(200).json({ message: "User deleted" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete" });
    }
});
exports.deleteUser = deleteUser;
const savePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.body.postId;
    const tokenUserId = req.userId;
    try {
        const savedPost = yield prisma_1.default.savedPost.findUnique({
            where: {
                userId_postId: {
                    userId: tokenUserId,
                    postId,
                },
            },
        });
        if (savedPost) {
            yield prisma_1.default.savedPost.delete({
                where: {
                    id: savedPost.id,
                },
            });
            res.status(200).json({ message: "Post removed from saved list" });
        }
        else {
            yield prisma_1.default.savedPost.create({
                data: {
                    userId: tokenUserId,
                    postId,
                },
            });
            res.status(200).json({ message: "Post saved" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to save post" });
    }
});
exports.savePost = savePost;
const profilePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUserId = req.params.userId;
    try {
        const userPosts = yield prisma_1.default.post.findMany({
            where: { userId: tokenUserId },
        });
        const saved = yield prisma_1.default.savedPost.findMany({
            where: { userId: tokenUserId },
            include: {
                post: true,
            },
        });
        const savedPost = saved.map((item) => item.post);
        res.status(200).json({ userPosts, savedPost });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get profile posts" });
    }
});
exports.profilePosts = profilePosts;
const getNotificationNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUserId = req.userId;
    try {
        const number = yield prisma_1.default.chat.count({
            where: {
                userIDs: {
                    hasSome: [tokenUserId],
                },
                NOT: {
                    seenBy: {
                        hasSome: [tokenUserId],
                    },
                },
            },
        });
        res.status(200).json(number);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get notification number" });
    }
});
exports.getNotificationNumber = getNotificationNumber;
//# sourceMappingURL=user.controller.js.map