const express = require("express");
const router = express.Router();
const Post = require("../schemas/post");
const authMiddleware = require("../middlewares/auth-middlewares");

// 게시글 작성 API
router.post("/posts", authMiddleware, async (req, res) => {
  const nickname = res.locals.user.nickname;
  const password = res.locals.user.password;
  console.log("게시글작성");
  console.log(nickname);
  console.log(password);
  const { title, content } = req.body;
  Post.create({ title, content, nickname, password });
  return res.status(201).send(" 게시글을 작성하였습니다.").end();
});

// 게시글 조회
router.get("/posts", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ errorMessage: "게시글 조회 실패" });
  }
});

// 게시글 상세 조회
router.get("/posts/:postId", authMiddleware, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ errorMessage: "게시물을 가져오지 못했습니다." });
  }
});

// 게시글 수정
router.put("/posts/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    const { title, content } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }
    post.title = title;
    post.content = content;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ errorMessage: "게시글 수정에 실패하였습니다." });
  }
});

// 게시글 삭제
router.delete("/posts/:postId", authMiddleware, async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ errorMessage: "게시글을 찾을 수 없습니다." });
  }
  await post.deleteOne();
  res.status(200).json({ message: "게시물 삭제를 완료하였습니다." });
});

module.exports = router;
