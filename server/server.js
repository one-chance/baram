const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "variables.env" });
const mongoose = require("mongoose");
const route = require("./routes/index");
const PORT = 3001;

const myLogger = require("./myLogger");

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    myLogger("[MONGODB CONNECT SUCCESS]");
  })
  .catch(e => {
    myLogger("[MONGODB CONNECT ERROR] >>>", e);
  });

mongoose.connection.on("reconnected", function () {
  myLogger("[MONGODB RECONNECTED]");
});

mongoose.connection.on("disconnected", function () {
  myLogger("[MONGODB DESCONNECTED]");
  mongoose.connect(process.env.MONGODB_URL, { server: { auto_reconnect: true } });
});

// FIX FOR (node:8120) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set("useCreateIndex", true);

const app = express();
// request 데이터 크기 기본 최대 100kb 인 것 수정
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({ 
  limit:"50mb", 
  extended: false
}));

app.listen(PORT, () => {
  myLogger(`express is running on ${PORT}`);
});

app.use("/api", route);

/*
 * TEST API ZONE START
 */
app.use("/hello", (req, res) => {
  res.send("HELLO, SERVER");
});
/*
 * TEST API ZONE END
 */
