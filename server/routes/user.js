const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

const UserInfoSchema = require('../schemas/User/UserInfoSchema');
/*
*    사용자 서버, 닉네임 검사
*    TYPE : POST
*    URI : /api/user/check
*    HEADER: { "token": token }
*    BODY: { "character": "닉네임", "server": "서버" }
*/
router.post('/check', (req, res) => {

  const encodeCharacter = encodeURI(req.body.character);
  const encodeServer = encodeURI(req.body.server);

  new Promise((resolve, reject) => {
    
    const option = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
      }
    }

    axios.get(`https://baram.nexon.com/Profile/Info?character=${encodeCharacter}%40${encodeServer}`, option)
      .then((html) => {
        if (html === undefined)
            throw new Error("NO HTML");
          
          const $ = cheerio.load(html.data);
          const $txtMessage = $("textarea").text();

          console.log($txtMessage);

          const regContainCharacter = new RegExp(req.body.character, "g");

          const regRes = regContainCharacter.test($txtMessage);
          console.log("REG RESPONSE > ", regRes);

          return regRes;
      })
      .then((regRes) => {
        //TODO DB PROCESS

        return regRes;
      })
      .then((authRes) => {
        if (authRes) {
          res.status(200).send({
            message: "인증에 성공하였습니다. 잠시 후 회원정보로 이동합니다.",
            code: 4000
          });
        }
        else {
          res.status(200).send({
            message: "인증에 실패하였습니다.",
            code: 4001
          });
        }
      })
      .catch((e) => {
        console.log("CHECK GAME USER ERROR > ", e);

        resolve(false);
      })
  });
});

/*
*    사용자 정보수정
*    TYPE : PUT
*    URI : /api/user/update
*    HEADER: { "token": token }
*    BODY: { "userInfo": IUserInfo }
*    ERROR CODES:
*        1: 성공
*        2: 변경 오류
*/
router.put('/update', (req, res) => {
  const userInfo = {
    id: req.body.id,
    server: req.body.server,
    character: req.body.character,
    editDateString: req.body.editDateString
  }

  UserInfoSchema.updateById(userInfo.id, userInfo)
    .then((updated) => {
      console.log(updated);

      if (updated) {
        console.log(`[SUCCESS] : ${userInfo.id} INFORMATION UPDATE`);
        res.status(200).send({
          message: "정보가 수정되었습니다.",
          code: 1
        });

        return true;
      }
      else {
        console.log(`[ERROR] : ${userInfo.id} INFORMATION UPDATE ERROR`);
        res.status(200).send({
          message: "작업 중 오류가 발생하였습니다. 잠시 후 다시 시도하여주세요.",
          code: 2
        });

        return false;
      }
    })
});


/*
*    사용자 정보조회
*    TYPE : GET
*    URI : /api/user/find
*    HEADER: { "token": token }
*    QUERYSTRING: { "id": id }
*    RETURN: userInfo
*    ERROR CODES:
*        1: 성공
*        2: 사용자 정보가 존재하지 않음.
*        3: 서버 오류
*/
router.get('/find', (req, res) => {
  const id = req.query.id;

  UserInfoSchema.findOneById(req.query.id)
    .then((user) => {
      if (user) {
        console.log(`[SUCCESS] : ${id} INFORMATION FIND`);
        res.status(200).send({
          message: "사용자 정보를 조회하였습니다.",
          code: 1,
          userInfo: user
        });

        return true;
      }
      else {
        console.log(`[ERROR] : ${id} INFORMATION FIND ERROR`);
        res.status(200).send({
          message: "사용자 정보를 찾을 수 없습니다.",
          code: 2
        });

        return null;
      }
    })
    .catch((e) => {
      console.log(`[ERROR] : ${id} INFORMATION FIND SERVER ERROR`);
      console.log(e);
      res.status(200).send({
        message: "사용자 정보를 찾는 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
        code: 3
      });
    })
});

/*
    LOGOUT: POST /api/account/logout
*/
router.post('/logout', (req, res) => {
    
});


/*
    SEARCH USER: GET /api/account/search/:username
*/
router.get('/search/:username', (req, res) => {
    // SEARCH USERNAMES THAT STARTS WITH GIVEN KEYWORD USING REGEX

});

// EMPTY SEARCH REQUEST: GET /api/account/search
router.get('/search', (req, res) => {
    res.json([]);
});

module.exports = router;