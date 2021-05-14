const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.S3_REGION });

const logger = require("../winston");
const visitMiddleware = require("../middleware/visit");

const UserSchema = require("../schemas/User/UserSchema");
const UserInfoSchema = require("../schemas/User/UserInfoSchema");
const ConfigSchema = require("../schemas/Common/ConfigSchema");
const SignInLogSchema = require("../schemas/Log/SignInLogSchema");
const VisitLogSchema = require("../schemas/Log/VisitLogSchema");

// 인증코드 정보를 저장할 객체
const mapVerifyCodeByEmail = new Map();

/*
 *    NOTE 아이디 중복 검사
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
      logger.info(`[FAILED] : ${id} IS ALREADY EXIST`);
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
 *    NOTE 사용자 회원가입
 *    TYPE : POST
 *    URI : /api/common/signup
 *    PARAM: { "id": "test", "password": "test", "salt": "salt", "createDate", "editDate" }
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
    createDate: new Date(),
    editDate: new Date(),
  });
  const email = req.body.email;

  // salt 획득
  crypto.randomBytes(32, (err, buf) => {
    // 32바이트 길이 랜덤 값 생성
    user.salt = buf.toString("base64");

    // 비밀번호 암호화
    // 1: 비밀번호 / 2: 랜덤값 / 3: 반복횟수 / 4: 비밀번호길이 / 5: 해시 알고리즘
    crypto.pbkdf2(user.password, user.salt, parseInt(process.env.PASSWORD_REPEAT), parseInt(process.env.PASSWORD_LENGTH), "sha512", (err, key) => {
      user.password = key.toString("base64");

      UserSchema.findOneById(user.id)
        .then(exist => {
          if (exist) {
            logger.info(`[FAILED] : ${user.id} IS ALREADY EXIST`);
            res.status(200).send({
              code: 1001,
              message: "중복된 유저",
            });

            return false;
          } else {
            UserSchema.create(user, (err, user) => {
              if (err) {
                logger.error(`[ERROR] : ${user.id} CREATED ERROR`);
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
                  createDate: user.createDate,
                  editDate: user.editDate,
                  email: email,
                  point: 0,
                  grade: "Level 1",
                  isActive: true,
                });

                UserInfoSchema.create(userInfo, (err, user) => {
                  logger.error(`[ERROR] : ${user.key} - ${user.id} INFORMATION CREATED ERROR`);
                  if (err) {
                    res.status(500).send({
                      code: 1002,
                      message: "DB 사용자 정보 생성 오류",
                    });

                    return false;
                  }

                  logger.info(`[SUCCESS] : ${signupUser.key} - ${signupUser.id} CREATED!!!`);

                  return true;
                });
              })
              .then(() => {
                res.status(200).send({
                  code: 200,
                  message: "회원가입이 완료되었습니다.",
                });

                return true;
              });
          }
        })
        .catch(e => {
          logger.error(`SIGNUP ERROR > ${e}`);

          res.status(500).send({
            code: 500,
            message: "서버 오류가 발생했습니다.",
          });

          return false;
        });
    });
  });
});

/*
 *    NOTE 사용자 로그인
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
        // 1: 입력비밀번호 / 2: 랜덤값 / 3: 반복횟수 / 4: 비밀번호길이 / 5: 해시 알고리즘
        crypto.pbkdf2(password, user.salt, parseInt(process.env.PASSWORD_REPEAT), parseInt(process.env.PASSWORD_LENGTH), "sha512", (err, key) => {
          if (key.toString("base64") === user.password) {
            logger.info(`[SUCCESS] : ${id} SIGNIN SUCCESSED`);

            UserInfoSchema.findOneById(id).then(userInfo => {
              const token = createToken(user.id, user.key, userInfo);

              // signInLog 컬렉션에 로그인 로깅
              const signInIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress; // 로그인 사용자 IP 조회
              SignInLogSchema.create({
                userId: id,
                signInIP: signInIP,
                signInDate: new Date(),
              });

              res.status(200).send({
                code: 200,
                message: "로그인 하였습니다.",
                token: token,
                isReset: user.isReset,
              });

              return true;
            });
          } else {
            logger.info(`[FAILED] : ${id} IS NOT MATCHED PASSWORD`);
            res.status(200).send({
              code: 1003,
              message: "비밀번호가 일치하지 않습니다.",
            });

            return false;
          }
        });
      } else {
        logger.info(`[FAILED] : ${id} IS NOT EXIST USER`);
        res.status(200).send({
          code: 1001,
          message: "존재하지 않는 사용자입니다.",
        });

        return false;
      }
    })
    .catch(e => {
      logger.error(`SIGNIN ERROR > ${e}`);

      res.status(500).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });
    });
});

/*
 *    NOTE 사용자 토큰 정보 갱신
 *    TYPE : POST
 *    URI : /api/common/refresh
 *    PARAM: { "id", "token"}
 *    ERROR CODES:
 *        200: 성공
 *        401: 유효하지 않은 토큰
 */
router.post("/refresh", (req, res) => {
  const { token, id, key } = req.body;
  const decoded = jsonwebtoken.verify(token, process.env.MONGODB_SECRET);

  UserInfoSchema.findOneById(id).then(userInfo => {
    if (decoded) {
      logger.info(`[SUCCESS] : ${id} REFRESHED ACCESS TOKEN`);
      res.status(200).send({
        code: 200,
        token: createToken(id, key, userInfo),
      });
    } else {
      logger.info(`[FAILED] : ${id} INVALID ACCESS TOKEN`);
      res.status(200).send({
        code: 401,
        token: null,
      });
    }
  });
});

/*
 *    NOTE S3 이미지 업로드
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
    region: process.env.S3_REGION,
  });

  var param = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${process.env.RUNTIME_MODE}/${process.env.BUCKET_KEY}/${fileName}`, // File Location and Name
    ACL: "public-read",
    Body: Buffer.from(file, "base64"), // String, Buffer, Stream
    ContentEncoding: "base64",
    ContentType: "image/png",
  };

  s3.upload(param, (err, data) => {
    if (data) {
      logger.info(`[SUCCESS] UPLOADDED IMAGE ${fileName}`);
      const url = `https://${process.env.BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${process.env.RUNTIME_MODE}/${process.env.BUCKET_KEY}/${fileName}`;
      res.status(200).send({
        code: 200,
        url: url,
      });
    } else {
      logger.error(`[ERROR] IMAGE UPLOAD FAILED : `, err);
      res.status(200).send({
        code: 500,
      });
    }
  });
});

/*
 *    NOTE S3 이미지 개수 체크
 *    TYPE : PUT
 *    URI : /api/common/config/imageCount
 *    ERROR CODES:
 *        200: 성공
 *        500: 실패
 */
router.post("/config/imageCount", (req, res) => {
  ConfigSchema.addNewImageCount(process.env.RUNTIME_MODE)
    .then(conf => {
      const { newImageCount } = conf;
      logger.info("[SUCCESS] CHECKED IMAGE COUNT");
      res.status(200).send({
        code: 200,
        newImageCount: newImageCount,
      });
      return true;
    })
    .catch(e => {
      logger.error("[ERROR] CHECK IMAGE COUNT ERROR");
      res.status(500).send({
        code: 500,
      });

      return false;
    });
});

/*
 *    NOTE 이메일 주소 인증 메일 발송
 *    TYPE : PUT
 *    URI : /api/common/email
 *    ERROR CODES:
 *        200: 성공
 *        201: 중복
 *        500: 실패
 */
router.put("/email", (req, res) => {
  const email = req.body.email;

  UserInfoSchema.findOneByEmail(email)
    .then(user => {
      if (user) {
        logger.info(`[FAILED] : EXIST USER USED BY ${email}`);

        res.status(200).send({
          code: 201,
          message: "이미 인증된 이메일 주소입니다.",
        });

        return false;
      } else {
        logger.info(`[SUCCESS] : NOT EXIST USER USED BY ${email}`);

        // 서버 메모리에 인증번호 정보 저장
        const date = new Date();
        crypto.randomBytes(8, (err, buf) => {
          const verifyCode = buf.toString("base64");
          mapVerifyCodeByEmail.set(email, {
            email,
            verifyCode,
            date: date,
          });

          const ses = new AWS.SES({
            apiVersion: "2010-12-01",
            accessKeyId: process.env.SES_USER_NAME,
            secretAccessKey: process.env.SES_SECRET_KEY,
            region: process.env.S3_REGION,
          });

          const SUBJECT = "[도톨] 이메일 인증번호 안내";
          const HTML_BODY = `
            안녕하세요.<br>
            바람의나라 유저를 위한 커뮤니티 <b>도톨</b>입니다.<br>
            아래 인증번호를 통해 이메일 인증을 완료해주세요.<br>
            <br>
            인증번호 : &nbsp; &nbsp;<b>${verifyCode}</b>
            <br><br>
            감사합니다.
          `;

          var params = {
            Destination: {
              /* required */
              // CcAddresses: [
              // ],
              ToAddresses: [email],
            },
            Message: {
              /* required */
              Body: {
                /* required */
                Html: {
                  Charset: "UTF-8",
                  Data: HTML_BODY,
                },
              },
              Subject: {
                Charset: "UTF-8",
                Data: SUBJECT,
              },
            },
            Source: process.env.EMAIL_SENDER /* required */,
            // ReplyToAddresses: [
            //   /* more items */
            // ],
          };

          // Create the promise and SES service object
          var sendPromise = ses.sendEmail(params).promise();

          // Handle promise's fulfilled/rejected states
          sendPromise
            .then(function (data) {
              console.log(`[SUCCESS] SEND EMAIL ${data.MessageId}`);
              res.status(200).send({
                code: 200,
                message: "발송된 이메일을 확인해주세요.",
              });

              return true;
            })
            .catch(function (err) {
              console.log(`[ERROR] SEND EMAIL FAILED : `, err);
              res.status(200).send({
                code: 500,
                message: "인증메일 전송에 실패하였습니다. 잠시 후 다시 시도해주세요.",
              });

              return false;
            });
        });
      }
    })
    .catch(e => {
      logger.error(`USER CHECK BY EMAIL ERROR > ${e}`);

      res.status(500).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});

/*
 *    NOTE 아이디로 이메일 주소 인증 메일 발송
 *    TYPE : PUT
 *    URI : /api/common/id/email
 *    ERROR CODES:
 *        200: 성공
 *        201: 중복
 *        500: 실패
 */
// 인증코드 정보를 저장할 객체
router.put("/id/email", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;

  UserInfoSchema.findOneByIdAndEmail(id, email)
    .then(user => {
      if (user) {
        logger.info(`[SUCCESS] : EXIST USER USED BY ${id} ${email}`);

        // 서버 메모리에 인증번호 정보 저장
        const date = new Date();
        crypto.randomBytes(8, (err, buf) => {
          const verifyCode = buf.toString("base64");
          mapVerifyCodeByEmail.set(email, {
            email,
            verifyCode,
            date: date,
          });

          const ses = new AWS.SES({
            apiVersion: "2010-12-01",
            accessKeyId: process.env.SES_USER_NAME,
            secretAccessKey: process.env.SES_SECRET_KEY,
            region: process.env.S3_REGION,
          });

          const SUBJECT = "[도톨] 비밀번호 찾기 안내";
          const HTML_BODY = `
            안녕하세요.<br>
            바람의나라 유저를 위한 커뮤니티 <b>도톨</b>입니다.<br>
            아래 인증번호로 인증을 완료하시면 임시 비밀번호가 발급됩니다.<br>
            로그인 후 비밀번호를 반드시 변경해주세요.<br>
            <br>
            인증번호 : &nbsp; &nbsp;<b>${verifyCode}</b>
            <br><br>
            감사합니다.
          `;

          var params = {
            Destination: {
              /* required */
              // CcAddresses: [
              // ],
              ToAddresses: [email],
            },
            Message: {
              /* required */
              Body: {
                /* required */
                Html: {
                  Charset: "UTF-8",
                  Data: HTML_BODY,
                },
              },
              Subject: {
                Charset: "UTF-8",
                Data: SUBJECT,
              },
            },
            Source: process.env.EMAIL_SENDER /* required */,
            // ReplyToAddresses: [
            //   /* more items */
            // ],
          };

          // Create the promise and SES service object
          var sendPromise = ses.sendEmail(params).promise();

          // Handle promise's fulfilled/rejected states
          sendPromise
            .then(function (data) {
              console.log(`[SUCCESS] SEND EMAIL ${data.MessageId}`);
              res.status(200).send({
                code: 200,
                message: "발송된 이메일을 확인해주세요.",
              });

              return true;
            })
            .catch(function (err) {
              console.log(`[ERROR] SEND EMAIL FAILED : `, err);
              res.status(200).send({
                code: 500,
                message: "인증메일 전송에 실패하였습니다. 잠시 후 다시 시도해주세요.",
              });

              return false;
            });
        });
      } else {
        logger.info(`[FAILED] : NOT EXIST USER USED BY ${id} ${email}`);
        res.status(200).send({
          code: 2005,
          message: "해당 사용자 정보를 찾을 수 없습니다. ID와 이메일 주소를 확인해주세요.",
        });

        return false;
      }
    })
    .catch(e => {
      logger.error(`USER CHECK BY EMAIL ERROR > ${e}`);

      res.status(500).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });

      return false;
    });
});

/*
 *    NOTE 인증메일 코드 인증
 *    TYPE : POST
 *    URI : /api/common/email
 *    ERROR CODES:
 *        200: 성공
 *        201: 불일치
 *        500: 에러
 */
router.post("/email", (req, res) => {
  const email = req.body.email;
  const emailCode = req.body.emailCode;

  const verify = mapVerifyCodeByEmail.get(email);

  if (verify) {
    if (verify.verifyCode === emailCode) {
      logger.info(`[SUCCESS] VERIFIED EMAIL ${email}`);
      res.status(200).send({
        code: 200,
      });
    } else {
      logger.info(`[ERROR] NOT VERIFIED EMAIL ${email}`);
      res.status(200).send({
        code: 201,
      });
    }
  } else {
    logger.error(`[ERROR] NOT FOUND VERIFIY EMAIL ${email}`);
    res.status(200).send({
      code: 500,
    });
  }
});

/*
 *    NOTE 이메일로 사용자 정보조회
 *    TYPE : GET
 *    URI : /api/common/find
 *    QUERYSTRING: { "email": email }
 *    RETURN: userId
 *    RETURN CODES:
 *        200: 성공
 *        2005: 사용자 정보가 존재하지 않음.
 *        500: 서버 오류
 */
router.get("/find", (req, res) => {
  const email = req.query.email;

  UserInfoSchema.findOneByEmail(email)
    .then(userInfo => {
      if (userInfo) {
        logger.info(`[SUCCESS] : FIND USERINFO BY ${email}`);
        res.status(200).send({
          code: 200,
          message: "사용자 정보를 조회하였습니다.",
          id: userInfo.id,
        });

        return true;
      } else {
        logger.info(`[FAILED] : FIND USERINFO ERROR BY ${email}`);
        res.status(200).send({
          code: 2005,
          message: "사용자 정보를 찾을 수 없습니다.",
        });

        return false;
      }
    })
    .catch(e => {
      logger.error(`INFORMATION FIND ERROR > ${e}`);
      res.status(200).send({
        code: 500,
        message: "사용자 정보를 찾는 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
      });

      return false;
    });
});

/*
 *    NOTE 비밀번호 초기화
 *    TYPE : POST
 *    URI : /api/common/reset
 *    ERROR CODES:
 *        200: 성공
 *        2005: 사용자 정보가 존재하지 않음.
 *        500: 실패
 */
router.put("/reset", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;

  // 1. 신규 비밀번호 생성
  const newPassword = {
    source: null,
    salt: null,
    password: null,
  };
  crypto.randomBytes(16, (err, buf) => {
    // 16 바이트 길이 랜덤 값 생성
    newPassword.source = buf.toString("base64");

    // salt 획득
    crypto.randomBytes(32, (err, buf) => {
      // 32 바이트 길이 랜덤 값 생성
      newPassword.salt = buf.toString("base64");

      // 비밀번호 암호화
      // 1: 비밀번호 / 2: 랜덤값 / 3: 반복횟수 / 4: 비밀번호길이 / 5: 해시 알고리즘
      crypto.pbkdf2(
        newPassword.source,
        newPassword.salt,
        parseInt(process.env.PASSWORD_REPEAT),
        parseInt(process.env.PASSWORD_LENGTH),
        "sha512",
        (err, key) => {
          newPassword.password = key.toString("base64");

          // 2. 사용자 업데이트
          const changePasswordInfo = {
            password: newPassword.password,
            salt: newPassword.salt,
            isReset: true,
            editDate: new Date(),
          };

          UserSchema.updateById(id, changePasswordInfo)
            .then(changedInfo => {
              if (changedInfo) {
                logger.info(`[SUCCESS] : ${changedInfo.id} CHANGE PASSWORD`);

                // 3. 이메일 발송
                const ses = new AWS.SES({
                  apiVersion: "2010-12-01",
                  accessKeyId: process.env.SES_USER_NAME,
                  secretAccessKey: process.env.SES_SECRET_KEY,
                  region: process.env.S3_REGION,
                });

                const SUBJECT = "[도톨] 신규 비밀번호 안내";
                const HTML_BODY = `
                  안녕하세요.
                  바람의나라 유저를 위한 커뮤니티, <b>도톨</b>입니다.<br>
                  <b>${id}</b>님의 임시 비밀번호가 발급되었습니다.<br>
                  로그인 후 비밀번호를 반드시 변경해주세요.<br>
                  임시 비밀번호 : &nbsp; &nbsp;${newPassword.source}<br>
                  <br><br>
                  감사합니다.<br>
                  <a href="https://www.dotols.com/signin">로그인 바로가기</a>                  
                `;

                var params = {
                  Destination: {
                    /* required */
                    // CcAddresses: [
                    // ],
                    ToAddresses: [email],
                  },
                  Message: {
                    /* required */
                    Body: {
                      /* required */
                      Html: {
                        Charset: "UTF-8",
                        Data: HTML_BODY,
                      },
                    },
                    Subject: {
                      Charset: "UTF-8",
                      Data: SUBJECT,
                    },
                  },
                  Source: process.env.EMAIL_SENDER /* required */,
                  // ReplyToAddresses: [
                  //   /* more items */
                  // ],
                };

                // Create the promise and SES service object
                var sendPromise = ses.sendEmail(params).promise();

                // Handle promise's fulfilled/rejected states
                sendPromise
                  .then(function (data) {
                    console.log(`[SUCCESS] SEND EMAIL ${data.MessageId}`);
                    res.status(200).send({
                      code: 200,
                      message: "신규 비밀번호를 전송하였습니다. 메일을 확인해주세요.",
                    });

                    return true;
                  })
                  .catch(function (err) {
                    console.log(`[ERROR] SEND EMAIL FAILED : `, err);
                    res.status(200).send({
                      code: 500,
                      message: "메일 전송에 실패하였습니다. 잠시 후 다시 시도해주세요.",
                    });

                    return false;
                  });

                return true;
              } else {
                logger.error(`[ERROR] : ${id} CHANGE PASSWORD ERROR`);
                res.status(200).send({
                  code: 2007,
                  message: "비밀번호 변경에 실패하였습니다. 잠시 후 다시 시도하여주세요.",
                });

                return false;
              }
            })
            .catch(e => {
              logger.error(`CHANGE PASSWORD ERROR > ${e}`);
              res.status(200).send({
                code: 500,
                message: "비밀번호 변경 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
              });

              return false;
            });
        }
      );
    });
  });
});

/*
 *    NOTE 방문자 세션 초기화
 *    TYPE : DELETE
 *    URI : /api/common/session/visitor
 *    ERROR CODES:
 *        200: 실행
 */
router.delete("/session/visitor", (req, res) => {
  if (process.env.SERVER_URI.indexOf(req.hostname)) {
    // 동일 호스트네임에서 온 요청으로만 초기화
    visitMiddleware.mapVisitor = new Map();
    logger.info("[SUCCESS] RESET TODAY VISITORS");
  } else logger.error("[ERROR] NOT ACCESSED");

  res.status(200).send();
});

/*
 *    NOTE 방문자 수 가져오기
 *    TYPE : POST
 *    URI : /api/common/visit/count
 *    ERROR CODES:
 *        200: 성공
 *        2005: 사용자 정보가 존재하지 않음.
 *        500: 실패
 */
router.get("/visit/count", (req, res) => {
  const visitorData = {
    today: 0,
    total: 0,
  };

  VisitLogSchema.getTodayVisitor()
    .then(todayVisitLog => {
      if (todayVisitLog && todayVisitLog.visitors) {
        visitorData.today = todayVisitLog.visitors.length;
      }

      ConfigSchema.getRuntimeConfig(process.env.RUNTIME_MODE).then(config => {
        if (config && config.totalVisitorCount) {
          visitorData.total = config.totalVisitorCount;
        }

        logger.info("[SUCCESS] GET VISITOR COUNT");
        res.status(200).send({
          code: 200,
          visitorData: visitorData,
        });

        return true;
      });
    })
    .catch(e => {
      logger.error(`GET VISITOR COUNT ERROR > ${e}`);
      res.status(200).send({
        code: 500,
        message: "방문자 수 정보를 가져오는 데 실패하였습니다.",
      });

      return false;
    });
});

/*
 *   NOTE 신규 토큰 생성
 */
const createToken = (id, key, userInfo) => {
  console.log("createToken : ");
  console.log({
    id,
    key,
    grade: userInfo.grade,
    titleAccount: userInfo.titleAccount,
  });

  // CREATE JSONWEBTOKEN
  const token = jsonwebtoken.sign(
    {
      id,
      key,
      grade: userInfo.grade,
      titleAccount: userInfo.titleAccount ? userInfo.titleAccount : {},
    },
    process.env.MONGODB_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

module.exports = router;
