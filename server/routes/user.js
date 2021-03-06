const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const crypto = require("crypto");

const logger = require("../winston");

const UserSchema = require("../schemas/User/UserSchema");
const UserInfoSchema = require("../schemas/User/UserInfoSchema");
const AccountInfoSchema = require("../schemas/User/AccountInfoSchema");

const {PlusPointByKey, MinusPointByKey} = require("../util/userUtil");

const jwt = require("jwt-decode");

/*
 *    NOTE 사용자 서버, 닉네임 검사
 *    TYPE : POST
 *    URI : /api/user/check
 *    HEADER: { "token": token }
 *    BODY: { "id", "server", "character" }
 *    RETURN CODES:
 *        200: 성공
 *        2001: 인증 실패
 *        500: 서버 오류
 */
router.post("/check", (req, res) => {
  const id = req.body.id;
  const server = req.body.server;
  const character = req.body.character;

  const encodeServer = encodeURI(server);
  const encodeCharacter = encodeURI(character);

  new Promise((resolve, reject) => {
    const option = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
      },
    };

    const getUri = `https://baram.nexon.com/Profile/Info?character=${encodeCharacter}%40${encodeServer}`;

    axios
      .get(getUri, option)
      .then(html => {
        if (html === undefined) throw new Error("NO HTML");

        const $ = cheerio.load(html.data);
        const $txtMessage = $("textarea").text();
        logger.info(`[SUCCESS] : ${character}@${server} PROFILE MESSAGE : ${$txtMessage}`);

        const regRes = new RegExp(`${id}`).test($txtMessage);

        return regRes;
      })
      .then(regRes => {
        if (regRes) {
          logger.info(`[SUCCESS] : ${id} - ${character}@${server} CONFIRM`);
          res.status(200).send({
            code: 200,
            message: "바람의나라 계정 확인에 성공하였습니다.",
          });
        } else {
          logger.error(`[ERROR] : ${id} - ${character}@${server} CONFIRM ERROR`);
          res.status(200).send({
            code: 2001,
            message: "바람의나라 계정 확인에 실패하였습니다. 인증 방법을 확인해주세요.",
          });
        }
      })
      .catch(e => {
        logger.error(`AUTHENTICATION ERROR > [GET URI] : ${getUri}`, e);
        res.status(200).send({
          code: 500,
          message: "바람의나라 계정 확인 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
        });

        return false;
      });
  });
});

/*
 *    NOTE 사용자 정보 인증
 *    TYPE : PUT
 *    URI : /api/user/auth
 *    HEADER: { "token": token }
 *    BODY: { "id", "server", "character" "authDate" }
 *    RETURN CODES:
 *        200: 인증 성공
 *        2002: 인증 실패
 *        2003: 중복 계정
 *        500: 서버 오류
 */
router.put("/auth", (req, res) => {
  const { key, id } = req.body;

  const accountInfo = {
    server: req.body.server,
    character: req.body.character,
    authDate: new Date(),
  };

  // Exist Check
  AccountInfoSchema.checkAccount(accountInfo.server, accountInfo.character)
    .then(exist => {
      if (exist) {
        logger.info(`[FAILED] : ${id} AUTHETICATION ERROR`);
        res.status(200).send({
          code: 2003,
          message: "이미 인증 처리 된 계정 입니다.",
        });
      } else {
        AccountInfoSchema.create({
          ...accountInfo,
          id: id,
        });

        UserInfoSchema.pushAccountListById(id, accountInfo).then(updated => {
          if (updated) {
            logger.info(`[SUCCESS] : ${id} AUTHETICATION`);
            res.status(200).send({
              code: 200,
              message: `${accountInfo.character}@${accountInfo.server} 인증에 성공하였습니다.`,
            });

            PlusPointByKey(key, 100);

            return true;
          } else {
            logger.error(`[ERROR] : ${id} AUTHETICATION ERROR`);
            res.status(200).send({
              code: 2002,
              message: `${accountInfo.character}@${accountInfo.server} 인증에 실패하였습니다.`,
            });

            return false;
          }
        });
      }
    })
    .catch(e => {
      logger.error("AUTHENTICATION ERROR > ", e);
      res.status(200).send({
        code: 500,
        message: "바람의나라 계정 확인 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
      });

      return false;
    });
});

/*
 *    NOTE 사용자 정보수정
 *    TYPE : PUT
 *    URI : /api/user/info
 *    HEADER: { "token": token }
 *    BODY: { "id", "openKakao", "editDate"}
 *    RETURN CODES:
 *        200: 성공
 *        2004: 변경 오류
 *        500: 서버 오류
 */
router.put("/info", (req, res) => {
  const id = req.body.id;
  const editedUserInfo = {
    openKakao: req.body.openKakao,
    editDate: new Date(),
  };

  UserInfoSchema.updateById(id, editedUserInfo)
    .then(updatedUserInfo => {
      if (updatedUserInfo) {
        logger.info(`[SUCCESS] : ${updatedUserInfo.id} INFORMATION UPDATE`);
        res.status(200).send({
          code: 200,
          message: "정보가 수정되었습니다.",
        });

        return true;
      } else {
        logger.error(`[ERROR] : ${updatedUserInfo.id} INFORMATION UPDATE ERROR`);
        res.status(200).send({
          code: 2004,
          message: "수정 작업 중 오류가 발생하였습니다. 잠시 후 다시 시도하여주세요.",
        });

        return false;
      }
    })
    .catch(e => {
      logger.error("INFORMATION UPDATE ERROR > ", e);
      res.status(200).send({
        code: 500,
        message: "바람의나라 계정 확인 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
      });

      return false;
    });
});

/*
 *    NOTE 사용자 정보조회
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
router.get("/find", (req, res) => {
  const id = req.query.id;
  const tokenId = jwt(req.headers.token).id;

  UserInfoSchema.findOneById(id, tokenId)
    .then(userInfo => {
      logger.info(JSON.stringify(userInfo));
      if (userInfo) {
        logger.info(`[SUCCESS] : ${id} INFORMATION FIND`);
        res.status(200).send({
          code: 200,
          message: "사용자 정보를 조회하였습니다.",
          userInfo: userInfo,
        });

        return true;
      } else {
        logger.info(`[FAILED] : ${id} INFORMATION FIND ERROR`);
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
 *    NOTE 대표캐릭터 설정
 *    TYPE : PUT
 *    URI : /api/user/titleaccount
 *    HEADER: { "token": token }
 *    BODY: { "id", "server", "character", "editDate" }
 *    RETURN CODES:
 *        200: 성공
 *        2006: 사용자 정보가 존재하지 않음.
 *        500: 서버 오류
 */
router.put("/titleaccount", (req, res) => {
  const { id, titleAccount } = req.body;
  const editDate = new Date();

  UserInfoSchema.updateById(id, { titleAccount, editDate })
    .then(updatedUserInfo => {
      if (updatedUserInfo) {
        logger.info(`[SUCCESS] : ${updatedUserInfo.id} SET TITLE ACCOUNT`);
        res.status(200).send({
          code: 200,
          message: "대표 캐릭터가 변경되었습니다.",
        });

        return true;
      } else {
        logger.error(`[ERROR] : ${updatedUserInfo.id} SET TITLE ACCOUNT ERROR`);
        res.status(200).send({
          code: 2006,
          message: "대표 캐릭터 변경에 실패하였습니다. 잠시 후 다시 시도하여주세요.",
        });

        return false;
      }
    })
    .catch(e => {
      logger.error(`SET TITLE ACCOUNT ERROR > ${e}`);
      res.status(200).send({
        code: 500,
        message: "대표 캐릭터 설정 중 서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
      });

      return false;
    });
});

/*
 *    NOTE 비밀번호 변경
 *    TYPE : PUT
 *    URI : /api/user/password
 *    HEADER: { "token": token }
 *    BODY: { "id", "password", "salt", "editDate" }
 *    RETURN CODES:
 *        200: 성공
 *        2007: 비밀번호 변경 실패
 *        500: 서버 오류
 */
router.put("/password", (req, res) => {
  // CHANGE PASSWORD INFO
  const id = req.body.id;

  const newPassword = {
    password: req.body.password,
    salt: null,
  };

  // salt 획득
  crypto.randomBytes(32, (err, buf) => {
    // 32 바이트 길이 랜덤 값 생성
    newPassword.salt = buf.toString("base64");

    // 비밀번호 암호화
    // 1: 비밀번호 / 2: 랜덤값 / 3: 반복횟수 / 4: 비밀번호길이 / 5: 해시 알고리즘
    crypto.pbkdf2(
      newPassword.password,
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
          isReset: false,
          editDate: new Date(),
        };

        UserSchema.updateById(id, changePasswordInfo)
          .then(changedInfo => {
            if (changedInfo) {
              logger.info(`[SUCCESS] : ${changedInfo.id} CHANGE PASSWORD`);
              res.status(200).send({
                code: 200,
                message: "비밀번호가 변경되었습니다. 다시 로그인 해 주세요.",
              });

              return true;
            } else {
              logger.error(`[ERROR] : ${changedInfo.id} CHANGE PASSWORD ERROR`);
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

/*
 *    NOTE 비밀번호 일치 확인
 *    TYPE : POST
 *    URI : /api/user/password
 *    HEADER: { "token": token }
 *    BODY: { "id", "password" }
 *    RETURN CODES:
 *        200: 성공
 *        2007: 비밀번호 변경 실패
 *        500: 서버 오류
 */
router.post("/password", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  UserSchema.findOneById(id)
    .then(user => {
      if (user) {
        // 패스워드 암호화 비교
        // 1: 입력비밀번호 / 2: 랜덤값 / 3: 반복횟수 / 4: 비밀번호길이 / 5: 해시 알고리즘
        crypto.pbkdf2(password, user.salt, parseInt(process.env.PASSWORD_REPEAT), parseInt(process.env.PASSWORD_LENGTH), "sha512", (err, key) => {
          if (key.toString("base64") === user.password) {
            logger.info(`[SUCCESS] : ${id} IS MATCHED PASSWORD`);

            res.status(200).send({
              code: 200,
              message: "일치하는 비밀번호 입니다.",
            });

            return true;
          } else {
            logger.info(`[FAILED] : ${id} IS NOT MATCHED PASSWORD`);
            res.status(200).send({
              code: 1003,
              message: "일치하지 않는 비밀번호 입니다.",
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
      logger.error(`PASSWORD CHECK ERROR > ${e}`);

      res.status(500).send({
        code: 500,
        message: "서버 오류가 발생했습니다.",
      });
    });
});

/*
 *    NOTE 회원 탈퇴
 *    TYPE : DELETE
 *    URI : /api/user/info
 *    HEADER: { "token": token, "id", "password" }
 *    RETURN CODES:
 *        200: 성공
 *        500: 서버 오류
 */
router.delete("/info", (req, res) => {
  const id = req.headers.id;

  UserSchema.deleteById(id)
    .then(() => {
      logger.info(`[SUCCESS] : ${id} WAS DELETED`);
    })
    .then(UserInfoSchema.deleteById(id))
    .then(() => {
      logger.info(`[SUCCESS] : ${id} INFORMATION WAS DELETED`);
    })
    .then(AccountInfoSchema.deleteById(id))
    .then(() => {
      logger.info(`[SUCCESS] : ${id} ACCOUNT INFORMATION WAS DELETED`);
    })
    .then(() => {
      res.status(200).send({
        code: 200,
        message: "사용자 정보가 정상적으로 삭제되었습니다.",
      });

      return true;
    })
    .catch(e => {
      logger.error(`DELETE USER ERROR > ${e}`);

      res.status(200).send({
        code: 500,
        message: "서버 오류로 인하여 사용자 정보가 정상적으로 삭제 되지 않았습니다. 관리자에게 문의해주세요.",
      });

      return false;
    });
});

module.exports = router;
