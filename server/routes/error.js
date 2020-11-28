const express = require('express');
const router = express.Router();

router.get('/auth', (req, res) => {
  res.status(200).send({
    code: 401,
    message: "접근 권한이 만료되었습니다. 잠시 후 로그인 페이지로 이동합니다.",
    redirectUri: "/signin"
  });
});

module.exports = router;