const express = require("express");
const error = require("./error");
const common = require("./common");
const user = require("./user");
const cal = require("./cal");
const free = require("./Board/free");
const tip = require("./Board/tip");
const trade = require("./Board/trade");
const video = require("./Board/video");
const market = require("./Auction/market");

const authMiddleware = require("../middleware/auth");
const visitMiddleware = require("../middleware/visit");

const router = express.Router();

router.use("/*", (req, res, next) => {
  res.setHeader("Expires", "-1");
  res.setHeader("Cache-Control", "must-revalidate, private");
  next();
});
router.use("/*", visitMiddleware);

router.use("/common", common);
router.use("/error", error);

router.use("/user", authMiddleware);
router.use("/user", user);

router.use("/board/free", free);
router.use("/board/tip", tip);
router.use("/board/trade", trade);
router.use("/board/video", video);

router.use("/auction/market", market);

router.use("/cal", cal);

module.exports = router;
