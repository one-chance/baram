const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
const logger = require('../winston');

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    logger.info("[FAILED] DO NOT FIND TOKEN INFORMATION IN REQUEST HEADER");
    res.redirect("/api/error/auth");
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.MONGODB_SECRET);
    if (!decoded) {
      throw new Error("YOU CAN NOT ACCESSED");
    }

    next();
  } catch (error) {
    logger.info(`[AUTH FAILED] - [${error.name}] : ${error.message} at ${error.expiredAt}`);

    res.status(200).send({
      code: 401,
      message: "접근 권한이 만료되었습니다. 잠시 후 로그인 페이지로 이동합니다.",
      redirectUri: "/signin",
    });

    // res.redirect('/api/error/auth');
  }
};

module.exports = authMiddleware;
