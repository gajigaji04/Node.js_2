const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");

// 로그인 API
router.post("/login", async (req, res) => {
  const { nickname, password } = req.body;

  // 닉네임 중복 확인
  const user = await User.findOne({ nickname });

  // 닉네임 중복, 패스워드 불일치 확인
  if (!user || user.password !== password) {
    res.status(400).json({ errorMessage: "로그인에 실패하였습니다." });
    return;
  }

  // 토큰 생성 시에 사용되는 비밀 키
  const secretKey = "gajigaji";

  // JWT 생성
  const token = jwt.sign({ userId: user._id }, "gajigaji", {
    expiresIn: 3600,
  });
  res.cookie("Authorization", `Bearer ${token}`);
  res.status(200).json({ token });
});

module.exports = router;
