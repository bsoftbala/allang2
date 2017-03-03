var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan             = require("morgan");

mongoose.connect('mongodb://mean:mean@ds163679.mlab.com:63679/mean');

mongoose.connection.on('connected', function(){
  console.log('mongoose connected');
});




var port = 1200;

var app = express();
app.use(morgan('dev') );
app.use(express.static(path.join(__dirname+'/public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var User = require('./models/users');

app.get('/users', function(req, res){
  User.find({}, function(err, users) {
    res.json({success: true, users: users});
  });
});

app.post('/register', function(req, res){
  console.log(req.body);
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  console.log(req.body.name);
  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:err});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });

});

app.listen(port, function(){
  console.log('running '+port)
})
