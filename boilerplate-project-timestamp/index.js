// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// include environment variables
require('dotenv').config();

//get middleware
const parseDate=require('./middleware');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { parse } = require('dotenv');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// home page css
app.use(express.static('public'));
//app.use(parseDate);

// home page html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?',parseDate, (req, res) => {return ;});

app.get('api/')

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
