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
    //let encodeCharacter = encodeURI(id);
    //let encodeServer = "%40%ED%95%98%EC%9E%90";
    const uri = basic + encodeURI(id);

    const option = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
      },
    };

    axios
      .get(uri, option)
      .then((html) => {
        if (html === undefined) throw new Error("NO HTML");

        let itemList = [];

        const $ = cheerio.load(html.data);
        console.log($['_equipItem']);
        const $level = Number($("div.inner ul").children("li.level").find("span.system").text());
        /*
        동적 웹 크롤링이 안되는 이슈로 인하여 아이템 가져오는 부분은 홀딩...

        const $itemList = $("div.item_list ul").children("li");
        $itemList.each((idx, el) => {
          itemList.push($(this).find('span.system').text());
        })
        console.log(itemList);
        */

        myLogger(`[SUCCESS] : `);
        res.status(200).send({
          code: 200,
          message: "성공하였습니다.",
          data: html.data,
          level: $level,
          // itemList: itemList,
        });
      })
      .catch((e) => {
        myLogger(`[GET URI] : `, uri);
        res.status(200).send({
          code: 500,
          message: "잠시 후 다시 시도해주세요.",
        });

        return false;
      });
  });
});

module.exports = router;
