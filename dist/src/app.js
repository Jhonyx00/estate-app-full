"use strict";
// import express from "express";
// const app = express();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.get("/", (req, res) => {
//   res.send("Si");
// });
// const PORT = 8800;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const post_route_1 = __importDefault(require("../routes/post.route"));
const app = (0, express_1.default)();
app.use("/api/posts", post_route_1.default);
const PORT = 8800;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map