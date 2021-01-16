const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "variables.env" });
const mongoose = require("mongoose");
const route = require("./routes/index");
const PORT = 3001;

const myLogger = require("./myLogger");

function connect() {
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, err => {
    if (err) {
      myLogger("[MONGO DB CONNECT ERROR] >>> ", err);
    } else {
      myLogger("[MONGO DB CONNECT SUCCESS]");
    }
  });
}
connect();

// FIX FOR (node:8120) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set("useCreateIndex", true);
mongoose.connection.on("disconnected", connect);

const app = express();
app.use(bodyParser.json());

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
