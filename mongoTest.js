const express = require('express');
const app = express();
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

router.get('/test', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("pmTest");
    dbo.collection(req.query.collection).find({}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      res.json(result);
    });
  });
});

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
