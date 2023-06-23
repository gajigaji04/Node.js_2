const express = require("express");
const app = express();
const port = 3000;

const cookieParser = require("cookie-parser");

app.use(cookieParser());
const authMiddlewares = require("./middlewares/auth-middlewares");

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

app.use(express.json());
app.use("/api", [postsRouter, commentsRouter, usersRouter, authRouter]);

const connect = require("./schemas");
connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", (req, res) => {
  res.send("회원 가입에 성공하셨습니다.");
});

app.post("/login", (req, res) => {
  // 토큰 생성 로직 추가 필요
  const token = "your-generated-token";
  res.send(token);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.on("error", (err) => {
  console.error("Server error:", err);
});
