
// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// include css
app.use(express.static('public'));

// render index
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami',(req,res)=>{
  const ip=req.ip.split(':').pop();
  const language=req.headers['accept-language'];
  const software=req.headers['user-agent'];
  res.json({ipaddress:ip,language:language,software:software});
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('*',(req,res)=>{
  res.status(404).send('Not Found');
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
