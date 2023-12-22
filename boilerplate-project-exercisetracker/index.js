const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const dict=[]
let id=0

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//post method to add user
app.post('/api/users',(req,res)=>{
  const {username}=req.body;
  const user={username:username,_id:id}
  id+=1;
  dict.push(user);
  // console.log(username);
  res.json(user);
});

//get method to read user
app.get("/api/users", (req, res) => {
  res.json(dict.map((user) => ({ username: user.username, _id: user._id })));
});

//post method to add exercises
app.post('/api/users/:_id/exercises',(req,res)=>{
  const cur_id=req.params._id;
  const cur_user=dict[cur_id];
  const {description,duration,date}=req.body;
  let exercisesDate;
  if(date){
    exercisesDate=new Date(date);
  }
  else{
    exercisesDate=new Date();
  }
  exercise={description:description,duration:parseInt(duration),date:exercisesDate.toDateString()};

  if (!cur_user.exercises) {
    cur_user.exercises = [];
  }
  cur_user.exercises.push(exercise);

  const reJson={username:cur_user.username,_id:cur_user._id,...exercise};
  res.json(reJson);
});

//get mthod return log of a user's full experiences
app.get('/api/users/:_id/logs',(req,res)=>{
  const id=req.params._id;
  const cur_user=dict[id];
  const cur_exercises=cur_user.exercises;

  let {from,to,limit}=req.query;
  let log=cur_exercises;

  if(from){
    log=log.filter((exercise)=>new Date(exercise.date)>=new Date(from));
  }
  if(to){
    log=log.filter((exercise)=>new Date(exercise.date)<=new Date(to));
  }
  if(limit){
    log=log.slice(0,parseInt(limit));
  }
  const reJson={username:cur_user.username,count:cur_exercises.length,_id:cur_user._id,log:log};

  res.json(reJson);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
