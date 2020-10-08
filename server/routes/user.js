const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

const myLogger = require('../myLogger');

const UserInfoSchema = require('../schemas/User/UserInfoSchema');
const AccountInfoSchema = require('../schemas/User/AccountInfoSchema');
const SignUpUserSchema = require('../schemas/User/SignUpUserSchema');

/*
*    사용자 서버, 닉네임 검사
*    TYPE : POST
*    URI : /api/user/check
*    HEADER: { "token": token }
*    BODY: { "character", "server" }
*    RETURN CODES:
*        200: 성공
*        2001: 인증 실패
*        500: 서버 오류
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
          //myLogger($txtMessage);

          const regRes = new RegExp(`${req.body.id}`).test($txtMessage);

          return regRes;
      })
      .then((regRes) => {
        if (regRes) {
          myLogger(`[SUCCESS] : ${req.body.id} - ${req.body.server}%${req.body.character}} CONFIRM`);
          res.status(200).send({
            code: 200,
            message: "바람의 나라 계정 확인에 성공하였습니다."
          });
        }
        else {
          myLogger(`[ERROR] : ${req.body.id} - ${req.body.server}%${req.body.character}} CONFIRM ERROR`);
          res.status(200).send({
            code: 2001,
            message: "바람의 나라 계정 확인에 실패하였습니다. 인증 방법을 확인해주세요."
          });
        }
      })
      .catch((e) => {
        myLogger("AUTHENTICATION ERROR > ", e);
        res.status(200).send({
          code: 500,
          message: "바람의 나라 계정 확인 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요."
        });

        resolve(false);
      });
  });
});

/*
*    사용자 정보 인증
*    TYPE : PUT
*    URI : /api/user/auth
*    HEADER: { "token": token }
*    BODY: { "id", "server", "character" "authDateString" }
*    RETURN CODES:
*        200: 인증 성공
*        2002: 인증 실패
*        2003: 중복 계정
*        500: 서버 오류
*/
router.put('/auth', (req, res) => {
  const id = req.body.id;

  const accountInfo = {
    server: req.body.server,
    character: req.body.character,
    authDateString: req.body.authDateString
  };

  // Exist Check
  AccountInfoSchema.checkAccount(id, accountInfo.server, accountInfo.character)
    .then((exist) => {
      if (exist) {
        myLogger(`[ERROR] : ${id} AUTHETICATION ERROR`);
        res.status(200).send({
          code: 2003,
          message: "이미 인증 처리 된 계정 입니다."
        });
      }
      else {
        AccountInfoSchema.create(id, accountInfo);

        UserInfoSchema.pushAccountList(id, accountInfo)
          .then((updated) => {
            
            if (updated) {
              myLogger(`[SUCCESS] : ${id} AUTHETICATION`);
              res.status(200).send({
                code: 200,
                message: `${accountInfo.server}%${accountInfo.character} 계정 인증에 성공하였습니다.`
              });
      
              return true;
            }
            else {
              myLogger(`[ERROR] : ${id} AUTHETICATION ERROR`);
              res.status(200).send({
                code: 2002,
                message: `${accountInfo.server}%${accountInfo.character} 계정 등록에 실패하였습니다.`
              });
      
              return false;
            }
          })
      }
    })
    .catch((e) => {
      myLogger("AUTHENTICATION ERROR > ", e);
      res.status(200).send({
        code: 500,
        message: "바람의 나라 계정 확인 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요."
      });

      resolve(false);
    });
});

/*
*    사용자 정보수정
*    TYPE : PUT
*    URI : /api/user/update
*    HEADER: { "token": token }
*    BODY: { "userInfo": IUserInfo }
*    RETURN CODES:
*        200: 성공
*        2004: 변경 오류
*        500: 서버 오류
*/
router.put('/update', (req, res) => {
  const editedUserInfo = {
    openKakao: req.body.openKakao,
    editDateString: req.body.editDateString
  }

  UserInfoSchema.updateById(req.body.id, editedUserInfo)
    .then((updatedUserInfo) => {
      if (updatedUserInfo) {
        myLogger(`[SUCCESS] : ${updatedUserInfo.id} INFORMATION UPDATE`);
        res.status(200).send({
          code: 200,
          message: "정보가 수정되었습니다."
        });

        return true;
      }
      else {
        myLogger(`[ERROR] : ${updatedUserInfo.id} INFORMATION UPDATE ERROR`);
        res.status(200).send({
          code: 2004,
          message: "수정 작업 중 오류가 발생하였습니다. 잠시 후 다시 시도하여주세요."
        });

        return false;
      }
    })
    .catch((e) => {
      myLogger("INFORMATION UPDATE ERROR > ", e);
      res.status(200).send({
        code: 500,
        message: "바람의 나라 계정 확인 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요."
      });

      resolve(false);
    })
});

/*
*    사용자 정보조회
*    TYPE : GET
*    URI : /api/user/find
*    HEADER: { "token": token }
*    QUERYSTRING: { "id": id }
*    RETURN: userInfo
*    RETURN CODES:
*        200: 성공
*        2005: 사용자 정보가 존재하지 않음.
*        500: 서버 오류
*/
router.get('/find', (req, res) => {
  const id = req.query.id;

  UserInfoSchema.findOneById(req.query.id)
    .then((user) => {
      if (user) {
        myLogger(`[SUCCESS] : ${id} INFORMATION FIND`);
        res.status(200).send({
          code: 200,
          message: "사용자 정보를 조회하였습니다.",
          userInfo: user
        });

        return true;
      }
      else {
        myLogger(`[ERROR] : ${id} INFORMATION FIND ERROR`);
        res.status(200).send({
          code: 2005,
          message: "사용자 정보를 찾을 수 없습니다."
        });

        return null;
      }
    })
    .catch((e) => {
      myLogger(`INFORMATION FIND ERROR > ${e}`);
      res.status(200).send({
        code: 500,
        message: "사용자 정보를 찾는 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요."
      });
    })
});

/*
*    대표캐릭터 설정
*    TYPE : PUT
*    URI : /api/user/settitle
*    HEADER: { "token": token }
*    BODY: { "id", "server", "character", "editDateString" }
*    RETURN CODES:
*        200: 성공
*        2006: 사용자 정보가 존재하지 않음.
*        500: 서버 오류
*/
router.put('/settitle', (req, res) => {
  const id = req.body.id;
  const titleAccountInfo = {
    server: req.body.server,
    character: req.body.character,
  }
  const editDateString = req.body.editDateString;
  
  UserInfoSchema.updateById(id, {titleAccount: titleAccountInfo, editDateString: editDateString})
    .then((updatedUserInfo) => {
      if (updatedUserInfo) {
        myLogger(`[SUCCESS] : ${updatedUserInfo.id} SET TITLE ACCOUNT`);
        res.status(200).send({
          code: 200,
          message: "대표캐릭터가 변경되었습니다."
        });

        return true;
      }
      else {
        myLogger(`[ERROR] : ${updatedUserInfo.id} SET TITLE ACCOUNT ERROR`);
        res.status(200).send({
          code: 2006,
          message: "대표캐릭터 변경에 실패하였습니다. 잠시 후 다시 시도하여주세요."
        });

        return false;
      }
    })
    .catch((e) => {
      myLogger(`SET TITLE ACCOUNT ERROR > ${e}`);
      myLogger(e);
      res.status(200).send({
        code: 500,
        message: "대표캐릭터 설정 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요."
      });
    })

});

/*
*    비밀번호 변경
*    TYPE : PUT
*    URI : /api/user/changepassword
*    HEADER: { "token": token }
*    BODY: { "id", "password", "slat", "editDateString" }
*    RETURN CODES:
*        200: 성공
*        2007: 비밀번호 변경 실패
*        500: 서버 오류
*/
router.put('/changepassword', (req, res) => {
  // CHANGE PASSWORD INFO
  const id = req.body.id;
  const changePasswordInfo = {
    password: req.body.password,
    salt: req.body.salt,
    editDateString: req.body.editDateString
  };

  SignUpUserSchema.changePassword(id, changePasswordInfo)
    .then((changedInfo) => {
      if (changedInfo) {
        myLogger(`[SUCCESS] : ${changedInfo.id} CHANGE PASSWORD`);
        res.status(200).send({
          code: 200,
          message: "비밀번호가 변경되었습니다. 다시 로그인 해 주세요."
        });

        return true;
      }
      else {
        myLogger(`[ERROR] : ${changedInfo.id} CHANGE PASSWORD ERROR`);
        res.status(200).send({
          code: 2007,
          message: "비밀번호 변경에 실패하였습니다. 잠시 후 다시 시도하여주세요."
        });

        return false;
      }
    })
    .catch((e) => {
      myLogger(`CHANGE PASSWORD ERROR > ${e}`);
      res.status(200).send({
        code: 500,
        message: "비밀번호 변경 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요."
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