const express = require("express");
const router = express.Router();
const User = require("../schemas/user");

// 회원 가입 API
router.post("/signup", async (req, res) => {
  const { nickname, password, confirmpassword } = req.body;

  if (password !== confirmpassword) {
    res.status(400).json({
      errorMessage: "패스워드가 동일하지 않습니다.",
    });
    return;
  }
  await User.create({ nickname, password });
  res.send("회원 가입에 성공하셨습니다.");
});

module.exports = router;
