"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const post_route_1 = __importDefault(require("../routes/post.route"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const test_route_1 = __importDefault(require("../routes/test.route"));
const user_route_1 = __importDefault(require("../routes/user.route"));
const chat_route_1 = __importDefault(require("../routes/chat.route"));
const message_route_1 = __importDefault(require("../routes/message.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express_1.default.json({ limit: "5mb" }));
app.use((0, cookie_parser_1.default)());
app.use("/api/users", user_route_1.default);
app.use("/api/posts", post_route_1.default);
app.use("/api/auth", auth_route_1.default);
app.use("/api/test", test_route_1.default);
app.use("/api/chats", chat_route_1.default);
app.use("/api/messages", message_route_1.default);
const PORT = 8800;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map