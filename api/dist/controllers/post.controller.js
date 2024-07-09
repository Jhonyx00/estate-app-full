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
exports.deletePost = exports.updatePost = exports.addPost = exports.getPost = exports.getPosts = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    try {
        const posts = yield prisma_1.default.post.findMany({
            where: {
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || undefined,
                    lte: parseInt(query.maxPrice) || undefined,
                },
            },
        });
        res.status(200).json({ message: posts });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get posts" });
    }
});
exports.getPosts = getPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    try {
        const post = yield prisma_1.default.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
                if (!err) {
                    const saved = yield prisma_1.default.savedPost.findUnique({
                        where: {
                            userId_postId: {
                                postId: id,
                                userId: payload.id,
                            },
                        },
                    });
                    res.status(200).json(Object.assign(Object.assign({}, post), { isSaved: saved ? true : false }));
                }
                else {
                    res.status(200).json(Object.assign(Object.assign({}, post), { isSaved: false }));
                }
            }));
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get post" });
    }
});
exports.getPost = getPost;
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const tokenUserId = req.userId;
    try {
        const newPost = yield prisma_1.default.post.create({
            data: Object.assign(Object.assign({}, body.postData), { userId: tokenUserId, postDetail: {
                    create: body.postDetail,
                } }),
        });
        res.status(200).json(newPost);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create post" });
    }
});
exports.addPost = addPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ message: "" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update post" });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const tokenUserId = req.userId;
    try {
        const post = yield prisma_1.default.post.findUnique({
            where: { id },
        });
        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized" });
        }
        yield prisma_1.default.post.delete({
            where: { id },
        });
        res.status(200).json({ message: "Post deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete post" });
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=post.controller.js.map