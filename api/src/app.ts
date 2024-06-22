import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import postRoute from "../routes/post.route";
import authRoute from "../routes/auth.route";
import testRoute from "../routes/test.route";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);

const PORT = 8800;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
