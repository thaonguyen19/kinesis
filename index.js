
var bodyParser = require("body-parser")
var express = require('express')
var app = express()

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


var appData;

app.post('/', function (req, res) {
  appData = req.rawBody;
  // res.send(req.rawBody);
})

app.get('/', function (req, res) {
  res.send(appData);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})