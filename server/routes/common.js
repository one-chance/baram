const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const config = require('../config.json');
const myLogger = require('../myLogger');

const UserSchema = require('../schemas/User/UserSchema');
const UserInfoSchema = require('../schemas/User/UserInfoSchema');

/*
*    아이디 중복 검사
*    TYPE : POST
*    URI : /api/common/checkid
*    PARAM: {"id"}
*    RESULT CODES:
*       200: 신규 ID
*       1001: 중복 ID
*/
router.post('/checkid', (req, res) => {
  const id = req.body.id;
  UserSchema.findOneById(id)
    .then((exist) => {
      if (exist) {
        myLogger(`[ERROR] : ${id} IS ALREADY EXIST`);
        res.status(200).send({
          code: 1001,
          message: "중복된 ID 입니다."
        });
      }
      else {
        res.status(200).send({
          code: 200,
          message: "사용 가능한 ID 입니다."
        });
      }
    });
});

/*
*    사용자 회원가입
*    TYPE : POST
*    URI : /api/common/signup
*    PARAM: { "id": "test", "password": "test", "salt": "salt", "createDateString", "editDateString" }
*    ERROR CODES:
*        200: 성공
*        1001: 중복 유저
*        1002: DB 생성 오류
*        1003: DB 중복 확인 오류
*/
router.post('/signup', (req, res) => {
  const user = new UserSchema({
    id: req.body.id,
    password: req.body.password,
    salt: req.body.salt,
    createDateString: new Date().toLocaleString(),
    editDateString: new Date().toLocaleString()
  });
  
  UserSchema.findOneById(user.id)
    .then((exist) => {
      if (exist) {
        myLogger(`[ERROR] : ${user.id} IS ALREADY EXIST`);
        res.status(200).send({
          code: 1001,
          message: "중복된 유저"
        });

        return false;
      }
      else {
        UserSchema.create(user, (err, user) => {
          if (err) {
            myLogger(`[ERROR] : ${user.id} CREATED ERROR`);
            res.status(500).send({
              code: 1002,
              message: "DB 계정 생성 오류"
            });

            return false;
          }

          return user;
        })
        .then((signupUser) => {
          const userInfo = new UserInfoSchema({
            key: signupUser.key,
            id: signupUser.id,
            createDateString: user.createDateString,
            editDateString: user.editDateString,
            point: 0,
            grade: "Level 1",
            isActive: true,
          });

          UserInfoSchema.create(userInfo, (err, user) => {
            myLogger(`[ERROR] : ${user.key} - ${user.id} INFORMATION CREATED ERROR`);
            if (err) {
              res.status(500).send({
                code: 1002,
                message: "DB 사용자 정보 생성 오류"
              });

              return false;
            }
            
            myLogger(`[SUCCESS] : ${signupUser.key} - ${signupUser.id} CREATED!!!`);

            return true;
          });
          
        })
        .then((isCreated) => {
          myLogger(isCreated);
          res.status(200).send({
            code: 200,
            message: "회원가입이 완료되었습니다."
          });

          return true;
        })
      }
    })
    .catch((e) => {
      myLogger(`SIGNUP ERROR > ${e}`);

      res.status(500).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});


/*
*    사용자 로그인
*    TYPE : POST
*    URI : /api/common/signin
*    PARAM: { "id": "test", "password": "test"}
*    ERROR CODES:
*        200: 성공
*        1001: 존재하지 않는 유저
*        1003: 패스워드 불일치
*        500: 서버 오류
*/
router.post('/signin', (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  
  UserSchema.findOneById(id)
    .then((user) => {
      if(user) {
        // 패스워드 암호화 비교
        const encryptPassword = crypto.createHash("sha512").update(password + user.salt).digest("hex");
        if ( encryptPassword !== user.password ) {
          myLogger(`[ERROR] : ${id} IS NOT MATCHED PASSWORD`);
          res.status(200).send({
            code: 1003,
            message: "일치하지 않는 비밀번호 입니다."
          });

          return false;
        }
        else {
          myLogger(`[SUCCESS] : ${id} SIGNIN SUCCESSED`);

          const token = createToken(user.key, id);

          res.status(200).send({
            code: 200,
            message: "로그인 하였습니다.",
            token: token
          });

          return true;
        }
      }
      else {
        myLogger(`[ERROR] : ${id} IS NOT EXIST USER`);
        res.status(200).send({
          code: 1001,
          message: "존재하지 않는 사용자입니다."
        });

        return false;
      }
    })
    .catch((e) => {
      myLogger(`SIGNIN ERROR > ${e}`);

      res.status(500).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });
    });
});

/*
*    사용자 토큰 정보 갱신
*    TYPE : POST
*    URI : /api/common/refresh
*    PARAM: { "id", "token"}
*    ERROR CODES:
*        200: 성공
*        401: 유효하지 않은 토큰
*/
router.post('/refresh', (req, res) => {
  const token = req.body.token;
  const id = req.body.id;
  const key = req.body.key;

  const decoded = jsonwebtoken.verify(token, config.secret);

  if (decoded) {
    myLogger(`[SUCCESS] : ${id} REFRESHED ACCESS TOKEN`);
    res.status(200).send({
      code: 200,
      token: createToken(key, id)
    });
  }
  else {
    myLogger(`[ERROR] : ${id} INVALID ACCESS TOKEN`);
    res.status(200).send({
      code: 401,
      token: null
    });
  }
});

/*
*   신규 토큰 생성
*/
const createToken = (_key, _id) => {
  // CREATE JSONWEBTOKEN
  const token = jsonwebtoken.sign(
    {
      key: _key,
      id: _id,
    },
    config.secret,
    {
      expiresIn: '1h'
    }
  );

  return token;
}

module.exports = router;