const express = require("express");
const router = express.Router();
const AllComment = require("../schemas/comment");

const authMiddleware = require("../middlewares/auth-middlewares");

// 댓글 작성 API
router.post("/posts/:postId/comments", authMiddleware, async (req, res) => {
  try {
    const { Comment } = req.body;
    const newComments = new AllComment({
      Comment,
    });
    const savedComments = await newComments.save();
    res.status(201).json(savedComments);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// 댓글 목록 조회
router.get("/posts/:postId/comments", authMiddleware, async (req, res) => {
  try {
    const Comments = await AllComment.find();
    res.status(200).json({ Comments });
  } catch (error) {
    res.status(500).json({ errorMessage: "게시글을 찾을 수 없습니다." });
  }
});

// 댓글 수정
router.put(
  "/posts/:postId/comments/:CommentId",
  authMiddleware,
  async (req, res) => {
    const CommentId = req.params.CommentId;
    const { Comment } = req.body;
    const comment = await AllComment.findById(CommentId);
    if (!comment) {
      return res
        .status(404)
        .json({ errorMessage: "게시글을 찾을 수 없습니다." });
    }

    await AllComment.findByIdAndUpdate(CommentId, { Comment });
    res.status(200).send("댓글을 수정하였습니다.").end();
  }
);

// 댓글 삭제
router.delete(
  "/posts/:postId/comments/:CommentId",
  authMiddleware,
  async (req, res) => {
    try {
      const CommentId = req.params.CommentId;
      const Comment = await AllComment.findById(CommentId);
      if (!Comment) {
        return res
          .status(404)
          .json({ errorMessage: "게시글을 찾을 수 없습니다." });
      }
      await Comment.deleteOne();
      res.status(200).json({ message: "댓글이 성공적으로 삭제되었습니다." });
    } catch (error) {
      res.status(500).json({ errorMessage: "댓글 삭제에 실패하였습니다." });
    }
  }
);

module.exports = router;
