const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const route = require('./routes/index');
const PORT = 3001;

const config = require('./config.json');
const mongoUri = `mongodb+srv://${config.id}:${config.password}@mycluster.xcgrs.mongodb.net/${config.dbName}?retryWrites=true&w=majority`

const app = express();
app.use(bodyParser.json());

 
// FIX FOR
// (node:12100) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true)
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log("[MONGO DB CONNECT SUCCESS]");
  })
  .catch((e) => {
    console.log("[MONGO DB CONNECT ERROR]");
  })

app.use('/api', route);

app.listen(PORT, ()=>{
  console.log(`express is running on ${PORT}`);
})


/*
* TEST API ZONE START
*/
app.use('/hello', (req, res)=> {
  console.log(config.id);
  res.send("HELLO, SERVER");
});

app.use('/dbcheck', (req, res) => {
  const db = mongoose.connection;
  db.on('error', () => {
    console.error.bind(console, 'connection error:')
    res.send("MONGO DB NOT CONNECTED");
  });
  db.once('open', () => {
    console.log("mongo db connection OK.");
    res.send("MONGO DB CONNECTED")
  });
});
/*
* TEST API ZONE END
*/