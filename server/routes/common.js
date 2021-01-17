const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const AWS = require('aws-sdk');
const fs  = require('fs');
const myLogger = require("../myLogger");

const UserSchema = require("../schemas/User/UserSchema");
const UserInfoSchema = require("../schemas/User/UserInfoSchema");
const ConfigSchema = require("../schemas/Common/ConfigSchema");

/*
 *    아이디 중복 검사
 *    TYPE : POST
 *    URI : /api/common/checkid
 *    PARAM: {"id"}
 *    RESULT CODES:
 *       200: 신규 ID
 *       1001: 중복 ID
 */
router.post("/checkid", (req, res) => {
  const id = req.body.id;
  UserSchema.findOneById(id).then(exist => {
    if (exist) {
      myLogger(`[ERROR] : ${id} IS ALREADY EXIST`);
      res.status(200).send({
        code: 1001,
        message: "이미 사용중인 ID 입니다.",
      });
    } else {
      res.status(200).send({
        code: 200,
        message: "사용 가능한 ID 입니다.",
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
router.post("/signup", (req, res) => {
  const user = new UserSchema({
    id: req.body.id,
    password: req.body.password,
    salt: req.body.salt,
    createDateString: new Date().toLocaleString(),
    editDateString: new Date().toLocaleString(),
  });

  UserSchema.findOneById(user.id)
    .then(exist => {
      if (exist) {
        myLogger(`[ERROR] : ${user.id} IS ALREADY EXIST`);
        res.status(200).send({
          code: 1001,
          message: "중복된 유저",
        });

        return false;
      } else {
        UserSchema.create(user, (err, user) => {
          if (err) {
            myLogger(`[ERROR] : ${user.id} CREATED ERROR`);
            res.status(500).send({
              code: 1002,
              message: "DB 계정 생성 오류",
            });

            return false;
          }

          return user;
        })
          .then(signupUser => {
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
                  message: "DB 사용자 정보 생성 오류",
                });

                return false;
              }

              myLogger(`[SUCCESS] : ${signupUser.key} - ${signupUser.id} CREATED!!!`);

              return true;
            });
          })
          .then(isCreated => {
            myLogger(isCreated);
            res.status(200).send({
              code: 200,
              message: "회원가입이 완료되었습니다.",
            });

            return true;
          });
      }
    })
    .catch(e => {
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
router.post("/signin", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  UserSchema.findOneById(id)
    .then(user => {
      if (user) {
        // 패스워드 암호화 비교
        const encryptPassword = crypto
          .createHash("sha512")
          .update(password + user.salt)
          .digest("hex");
        if (encryptPassword !== user.password) {
          myLogger(`[ERROR] : ${id} IS NOT MATCHED PASSWORD`);
          res.status(200).send({
            code: 1003,
            message: "일치하지 않는 비밀번호 입니다.",
          });

          return false;
        } else {
          myLogger(`[SUCCESS] : ${id} SIGNIN SUCCESSED`);

          const token = createToken(user.key, id);

          res.status(200).send({
            code: 200,
            message: "로그인 하였습니다.",
            token: token,
          });

          return true;
        }
      } else {
        myLogger(`[ERROR] : ${id} IS NOT EXIST USER`);
        res.status(200).send({
          code: 1001,
          message: "존재하지 않는 사용자입니다.",
        });

        return false;
      }
    })
    .catch(e => {
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
router.post("/refresh", (req, res) => {
  const token = req.body.token;
  const id = req.body.id;
  const key = req.body.key;

  const decoded = jsonwebtoken.verify(token, process.env.MONGODB_SECRET);

  if (decoded) {
    myLogger(`[SUCCESS] : ${id} REFRESHED ACCESS TOKEN`);
    res.status(200).send({
      code: 200,
      token: createToken(key, id),
    });
  } else {
    myLogger(`[ERROR] : ${id} INVALID ACCESS TOKEN`);
    res.status(200).send({
      code: 401,
      token: null,
    });
  }
});

/*
*    S3 이미지 업로드
*    TYPE : PUT
*    URI : /api/common/upload
*    PARAM: { "fileName", "file"}
*    ERROR CODES:
*        200: 성공
*        500: 업로드 실패
*/
router.post("/upload", (req, res) => {
  const fileName = req.body.fileName;
  const file = req.body.file;

  const s3 = new AWS.S3({
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
    region: process.env.S3_REGION
  });

  var param = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${process.env.RUNTIME_MODE}/${process.env.BUCKET_KEY}/${fileName}`, // File Location and Name
    ACL:'public-read',
    Body: Buffer.from(file, "base64"), // String, Buffer, Stream
    ContentEncoding: 'base64',
    ContentType:'image/png'
  }

  s3.upload(param, (err, data) => {
    if (data) {
      console.log(`[SUCCESS] UPLOADDED IMAGE ${fileName}`);
      const url = `https://${process.env.BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${process.env.RUNTIME_MODE}/${process.env.BUCKET_KEY}/${fileName}`;
      res.status(200).send({
        code: 200,
        url: url
      });
    }
    else{
      console.log(`[ERROR] IMAGE UPLOAD FAILED : `, err);
      res.status(200).send({
        code: 500,
      });
    }
  });
});

/*
*    S3 이미지 개수 체크
*    TYPE : PUT
*    URI : /api/common/config/imageCount
*    ERROR CODES:
*        200: 성공
*        500: 실패
*/
router.post("/config/imageCount", (req, res) => {

  ConfigSchema.findOne({
    mode: process.env.RUNTIME_MODE
  })
    .then((config) => {
      if (config) {
        const newImageCount = config.newImageCount;
        config.newImageCount += 1;

        ConfigSchema.updateByMode(process.env.RUNTIME_MODE, config)
          .then(() => {
            
            res.status(200).send({
              code: 200,
              newImageCount: newImageCount
            });
            return true;
          });
      }
    })
    .catch((e) => {
      console.log('[ERROR] GET CONFIG SERVER ERROR');

      res.status(500).send({
        code: 500,
      });

      return false;
    });
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
    process.env.MONGODB_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

module.exports = router;
