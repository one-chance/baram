const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

const myLogger = require("../myLogger");

/*
 *
 *    TYPE : GET
 *    URI : /api/cal/item
 *    QUERYSTRING: { "id": id }
 *    RETURN CODES:
 *        200: 성공
 *        500: 서버 오류
 */
router.get("/item", (req, res) => {
  const id = req.query.id;

  new Promise((resolve, reject) => {
    let basic = "https://baram.nexon.com/Profile/Info?character=";
    let encodeCharacter = encodeURI("협가검");
    let encodeServer = "%40%ED%95%98%EC%9E%90";

    const option = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
      },
    };

    const uri = basic + encodeCharacter + encodeServer;
    axios
      .get(uri, option)
      .then((html) => {
        if (html === undefined) throw new Error("NO HTML");

        const $ = cheerio.load(html.data);
        const $bodyList = $("div.inner ul").children("li.level");
        let ary = Number($bodyList.find("span.system").text());
        myLogger(`[SUCCESS] : `);
        res.status(200).send({
          code: 200,
          message: "성공하였습니다.",
          data: html.data,
          ary: ary,
        });

        return $bodyList;
      })
      .catch((e) => {
        myLogger(`[GET URI] : `);
        res.status(200).send({
          code: 500,
          message: "잠시 후 다시 시도해주세요.",
        });

        return false;
      });
  });
});

module.exports = router;
