const express = require('express');
const router = express.Router();

router.get('/auth', (req, res) => {
  res.status(200).send({
    code: 401,
    message: "접근 권한이 만료되었습니다.",
    redirectUri: "/error/auth"
  });
});

module.exports = router;