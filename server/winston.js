require("dotenv").config({ path: "variables.env" });
const winston = require("winston");
const moment = require("moment-timezone");
const winstonDaily = require("winston-daily-rotate-file");

const logDir = "logs"; // logs 디렉토리 하위에 로그 파일 저장
const { format } = require("winston");
const { combine, printf } = format;

// Define log format
const logFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});
const date = moment().tz("Asia/Seoul");
const koreaTime = format(info => {
  info.timestamp = date.format("YYYY-MM-DD HH:mm:ss");
  return info;
});

const LOG_PERIOD = 30; // 일 단위

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: combine(koreaTime(), logFormat),
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: LOG_PERIOD, // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error", // error.log 파일은 /logs/error 하위에 저장
      filename: `%DATE%.error.log`,
      maxFiles: LOG_PERIOD,
      zippedArchive: true,
    }),
  ],
});

// Production 환경이 아닌 경우(dev 등)
if (process.env.RUNTIME_MODE !== "prod") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // 색깔 넣어서 출력
        winston.format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
      ),
    })
  );
}

module.exports = logger;
