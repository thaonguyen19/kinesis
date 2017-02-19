
//10.19.187.143
var bodyParser = require("body-parser");
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/testDb5');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  var TestDb = mongoose.model('Test', new Schema({ value: Number, timestamp: Number }));

  app.use(function(req, res, next) {
    req.rawBody = '';
    req.setEncoding('utf8');

    req.on('data', function(chunk) { 
      req.rawBody += chunk;
    });

    req.on('end', function() {
      next();
    });
  });
  app.use(bodyParser.raw());

 // app.use(require('json-middleware').middleware())
  var appData;
  var timeStampCounter = 0;

  app.post('/', function (req, res) {
    firstNumber = parseInt(req.rawBody.substring(8,10));
    timeStampCounter += 1;
    //secondNumber = req.rawBody.substring(10,12)
    console.log(firstNumber, timeStampCounter);
    if ((firstNumber) && (firstNumber >= 0)) {
    TestDb.create({ value: firstNumber, timestamp: timeStampCounter}, function (err, small) {
      if (err) return handleError(err);
      res.send();
    });
    } else {res.send();}
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

//THINGS TO REMEMBER
//CLEAN DATABASE (CHANGE IN FILE AND ON COMMAND)
//EXPORT TO CSV
//OPEN TWO EXCEL FILES
//UPDATE LINE GRAPH ONLY ('personalized to doctor's data prefs")

//mongoexport --host localhost --db testDb5 --collection tests --csv --out text.csv --fields value,timestamp
//curl -H "Content-Type: application/json" -X POST -d '{"timestamp":4, "value":5}' http://localhost:3000
//use [database];
//db.dropDatabase();

//ipconfig getifaddr en0
