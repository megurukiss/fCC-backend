require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns=require('dns');
const URL=require('url').URL;

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.urlencoded({ extended: false }));

const shorturlRec=[];
let curUrl=0;

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl',(req,res)=>{
  //console.log(req.body.name);
  const {url}=req.body;
  let hostname;
  try{
    const newURL=new URL(url);
    hostname=newURL.hostname;
    //console.log(hostname);
  }catch(err){
    return res.json({ error: 'invalid url' });
  }

  //check url is valid
  dns.lookup(hostname,(err)=>{
    if(err){
      return res.json({ error: 'invalid url' });
    }
    else{
      //check if in the record
      const found=shorturlRec.find((item)=>item.original_url===url);
      if(!found){
      curUrl+=1;
      shorturlRec.push({original_url:url,short_url:curUrl});
      return res.json({original_url:url,short_url:curUrl});
      }
      else{
        return res.json(found);
      }
    }
  });
  //res.json(req.body);
});

app.get('/api/shorturl/:short_url',(req,res)=>{
  const {short_url}=req.params;
  const found=shorturlRec.find((item)=>item.short_url==short_url);
  if(found){
    return res.redirect(found.original_url);
  }
  else{
    return res.json({ error: 'No short URL found for the given input' });
  }
});

app.get('/api/shorturl/*',(req,res)=>{
  return res.status(404).json({ error: 'No short URL found for the given input' });
});

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
