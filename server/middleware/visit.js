require("dotenv").config({ path: "variables.env" });
const logger = require('../winston');
const request = require('request');

const VisitLogSchema = require("../schemas/Log/VisitLogSchema");
const ConfigSchema = require("../schemas/Common/ConfigSchema");

let mapVisitor = new Map();

// 방문자 구분은 IP를 기준으로 한다.
const visitMiddleware = (req, res, next) => {

  if (!process.env.SERVER_URI.indexOf(req.hostname) || (process.env.RUNTIME_MODE === 'dev')) { // 서버에서 보낸 요청은 제외
    // 방문자 정보 확인
    const visitor = {
      ip: req.headers['x-forwarded-for'] ||  req.connection.remoteAddress, // 로그인 사용자 IP 조회
      visitDate: new Date()
    }
  
    // 방문자 세션 체크
    if (mapVisitor[visitor.ip]){ // 방문했던 IP
    }
    else { // 처음 방문 하는 IP 
  
      // 방문자 카운터 및 로그
      VisitLogSchema.addVisitor(visitor)
      .then(() => {
        logger.info("[SUCCESS] CHECKED VISITOR");
  
        ConfigSchema.addTotalVisitorCount(process.env.RUNTIME_MODE)
          .then(() => {
            logger.info("[SUCCESS] ADD VISIT COUNT");
          })
          .catch(e => {
            logger.error("[ERROR] CHECK VISIT COUNT ERROR", {
              visitor: visitor,
              error: e
            });
          });
      })
      .catch(e => {
        logger.error("[ERROR] CHECK VISITOR ERROR", {
          visitor: visitor,
          error: e
        });
      });
  
      // 방문자 세션에 저장
      mapVisitor[visitor.ip] = visitor;
    }
  }

  next();
};

module.exports = visitMiddleware;
