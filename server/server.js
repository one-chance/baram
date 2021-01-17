const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const route = require('./routes/index');
const PORT = 3001;

const config = require('./config.json');
const myLogger = require('./myLogger');

const mongoUri = `mongodb+srv://${config.id}:${config.password}@mycluster.xcgrs.mongodb.net/${config.dbName}?retryWrites=true&w=majority`
function connect() {
  mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
      myLogger("[MONGO DB CONNECT SUCCESS]");
    })
    .catch((e) => {
      myLogger("[MONGO DB CONNECT ERROR] >>> ", e);
      setTimeout(() => {
        
      }, 5000);
    });
}

// FIX FOR
// (node:12100) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true)
connect();
mongoose.connection.on('disconnected', connect);

const app = express();
// request 데이터 크기 기본 최대 100kb 인 것 수정
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({ 
  limit:"50mb", 
  extended: false
}));

app.listen(PORT, ()=>{
  myLogger(`express is running on ${PORT}`);
})

app.use('/api', route);

/*
* TEST API ZONE START
*/
app.use('/hello', (req, res)=> {
  res.send("HELLO, SERVER");
});
/*
* TEST API ZONE END
*/