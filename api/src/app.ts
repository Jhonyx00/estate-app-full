import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import postRoute from "../routes/post.route";
import authRoute from "../routes/auth.route";
import testRoute from "../routes/test.route";
import userRoute from "../routes/user.route";
import chatRoute from "../routes/chat.route";
import messageRoute from "../routes/message.route";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const PORT = 8800;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
