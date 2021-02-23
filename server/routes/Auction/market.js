const express = require("express");
const router = express.Router();

const logger = require('../../winston');
const MarketItemSchema = require("../../schemas/Auction/MarketItemSchema");

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
    var filter = {};
    if (req.query.item) {
      filter = {
        title: { $regex: req.query.item },
      };
    }
  
    MarketItemSchema.findByFilter(filter)
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
  
  module.exports = router;