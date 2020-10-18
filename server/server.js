const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const route = require("./routes/index");
const PORT = 3001;

const config = require("./config.json");
const myLogger = require("./myLogger");

const mongoUri = `mongodb+srv://${config.id}:${config.password}@mycluster.xcgrs.mongodb.net/${config.dbName}?retryWrites=true&w=majority`;
function connect() {
  mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
      myLogger("[MONGO DB CONNECT SUCCESS]");
    })
    .catch((e) => {
      myLogger("[MONGO DB CONNECT ERROR]");
    });
}

// FIX FOR
// (node:12100) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set("useCreateIndex", true);
connect();
mongoose.connection.on("disconnected", connect);

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use("/api", route);

app.listen(PORT, () => {
  myLogger(`express is running on ${PORT}`);
});

/*
 * TEST API ZONE START
 */
app.use("/hello", (req, res) => {
  myLogger(config.id);
  res.send("HELLO, SERVER");
});
/*
 * TEST API ZONE END
 */
