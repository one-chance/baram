const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

const logger = require("../winston");

const SearchItemSchema = require("../schemas/Cal/SearchItemSchema");
const SearchOptionSchema = require("../schemas/Cal/SearchOptionSchema");

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
      .then(html => {
        if (html === undefined) throw new Error("NO HTML");

        //let itemList = [];

        const $ = cheerio.load(html.data);
        //console.log($["_equipItem"]);
        const $level = Number($("div.inner ul").children("li.level").find("span.system").text());
        /*
        동적 웹 크롤링이 안되는 이슈로 인하여 아이템 가져오는 부분은 홀딩...

        const $itemList = $("div.item_list ul").children("li");
        $itemList.each((idx, el) => {
          itemList.push($(this).find('span.system').text());
        })
        console.log(itemList);
        */

        logger.info(`[SUCCESS] : `);
        res.status(200).send({
          code: 200,
          message: "성공하였습니다.",
          data: html.data,
          level: $level,
          // itemList: itemList,
        });
      })
      .catch(e => {
        logger.error(`[GET URI] : `, uri);
        res.status(200).send({
          code: 500,
          message: "잠시 후 다시 시도해주세요.",
        });

        return false;
      });
  });
});

/*
 *    TYPE : GET
 *    URI : /api/cal/searchitem
 *    QUERYSTRING: {
        "name": _name,
        "op1": _op1,
        "op2": _op2,
        "op3": _op3
      }
 *    RETURN CODES:
 *        200: 성공
 *        500: 서버 오류
 */
router.get("/searchitem", (req, res) => {
  var filter = {};
  if (req.query.hasOwnProperty("name") && req.query.name !== "" && req.query.name !== "0") filter["name"] = { $regex: req.query.name + ".*" };
  if (req.query.hasOwnProperty("op1") && req.query.op1 !== "0") filter["op1"] = req.query.op1;
  if (req.query.hasOwnProperty("op2") && req.query.op2 !== "0") filter["op2"] = req.query.op2;
  if (req.query.hasOwnProperty("op3") && req.query.op3 !== "0") filter["op3"] = req.query.op3;

  SearchItemSchema.findByFilter(filter)
    .then(items => {
      res.status(200).send({
        code: 200,
        message: "아이템 조회에 성공하였습니다.",
        items: items,
      });

      return true;
    })
    .catch(e => {
      res.status(200).send({
        code: 500,
        message: "아이템 조회 중 오류가 발생하였습니다.",
      });
      return false;
    });
});

/*
 *    TYPE : GET
 *    URI : /api/cal/searchoption
 *    QUERYSTRING: {
        "name": _name,
      }
 *    RETURN CODES:
 *        200: 성공, item option 1개
 *        500: 서버 오류
 */
router.get("/searchoption", (req, res) => {
  var filter = {};
  filter["name"] = req.query.name;

  SearchOptionSchema.findOneByFilter(filter)
    .then(items => {
      res.status(200).send({
        code: 200,
        message: "아이템 조회에 성공하였습니다.",
        items: items,
      });

      return true;
    })
    .catch(e => {
      res.status(200).send({
        code: 500,
        message: "아이템 조회 중 오류가 발생하였습니다.",
      });
      return false;
    });
});

router.get("/tradition", (req, res) => {
  const year = req.query.yyyy;
  const month = req.query.mm;
  const day = req.query.dd;

  new Promise((resolve, reject) => {
    var param = "lunYear=" + year + "&lunMonth=" + month + "&lunDay=" + day;
    var key = "&ServiceKey=72ItYH8uDU2pI72WvT8aJXRKDUsydwcnrGsgMgm7SXKXQs6ozKcMgl%2BuU%2BFjxHsCqPd56kvFuOajaq2Hyl%2BmFg%3D%3D";
    var url = "http://apis.data.go.kr/B090041/openapi/service/LrsrCldInfoService/getSolCalInfo?" + param + key;

    const option = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .get(url, option)
      .then(html => {
        const datas = html.data.response.body.items.item;
        res.status(200).send({
          code: 200,
          message: "성공하였습니다.",
          data: datas,
        });
      })
      .catch(e => {
        res.status(200).send({
          code: 500,
          message: "잠시 후 다시 시도해주세요.",
        });

        return false;
      });
  });
});

module.exports = router;
