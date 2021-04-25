
const UserInfoSchema = require("../schemas/User/UserInfoSchema");
const logger = require('../winston');

module.exports.PlusPointByKey = function PlusPointByKey(key, point) {
  UserInfoSchema.plusPointByKey(key, point)
    .then(() => {
      logger.info(`[SUCCESS] : PLUS POINT [${key}] ${point}`);
    })
    .catch(e => {
      logger.error(`[ERROR] : PLUS POINT ERROR [${key}] ${point} > ${e}`);
    });
};

module.exports.MinusPointByKey = function MinusPointByKey(key, point) {
  UserInfoSchema.minusPointByKey(key, point)
    .then(() => {
      logger.info(`[SUCCESS] : MINUS POINT [${key}] ${point}`);
    })
    .catch(e => {
      logger.error(`[ERROR] : MINUS POINT ERROR [${key}] ${point} > ${e}`);
    });
};

