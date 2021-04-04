const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth");
const logger = require('../../winston');

const MarketContentSchema = require("../../schemas/Auction/MarketContentSchema");

/*
 *    NOTE 거래소 아이템 전체 조회
 *    TYPE : GET
 *    URI : /api/auction/market/find
 *    HEADER: { "token": token }
 *    BODY: { "filter" }
 *    RETURN CODES:
 *        200: 성공
 *        500: 서버 오류
 */
router.get("/find", (req, res) => {
    MarketContentSchema.findAll()
      .then(posts => {
        logger.info(`[SUCCESS] : POST LIST FIND SUCCESS`);
        // 최신 조회 개수가 존재하면
        let postList = req.query.latestCount ?
            posts.slice(0, req.query.latestCount)
          : posts;
  
        res.status(200).send({
          code: 200,
          message: "거래소 아이템 조회에 성공하였습니다.",
          posts: postList,
        });
  
        return true;
      })
      .catch(e => {
        logger.error(`POST LIST FIND ERROR > ${e}`);
        res.status(200).send({
          code: 500,
          message: "거래소 아이템 조회 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
        });
  
        return false;
      });
  });

/*
 *    NOTE 거래소 아이템 추가
 *    TYPE : POST
 *    URI : /api/auction/market/post
 *    HEADER: { "token": token }
 *    BODY: { "filter" }
 *    RETURN CODES:
 *        200: 성공
 *        3001: 거래소 DB 생성 오류
 *        500: 서버 오류
 */
  
router.use("/post", authMiddleware);
router.post("/post", (req, res) => {
  const post = new MarketContentSchema({
    ...req.body.post
  });

  MarketContentSchema.create(post, (err, post) => {
    if (err) {
      logger.error(`[ERROR] : MarketContent CREATED ERROR`);
      res.status(200).send({
        code: 3001,
        message: "DB 거래소 생성 오류",
      });
      return false;
    }
    return post;
  })
  .then(post => {
    logger.info(`[SUCCESS] : MarketContent CREATED SUCCESS`);
    res.status(200).send({
      code: 200,
      message: "게시글이 등록되었습니다.",
      seq: post.seq,
    });

    return true;
  })
  .catch(e => {
    logger.error(`POST CREATE ERROR > ${e}`);

    res.status(200).send({
      code: 500,
      message: "서버 오류가 발생했습니다.",
    });

    return false;
  });
});

  module.exports = router;