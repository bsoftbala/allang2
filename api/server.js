var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://mean:mean@ds163679.mlab.com:63679/mean');

mongoose.connection.on('connected', function(){
  console.log('mongoose connected');
});



var port = 1200;

var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var User = require('./models/users');

app.get('/users', function(req, res){
  User.find({}, function(err, users) {
     //res.render('/usersList', {users: users});
     res.json({success: true, users: users});
  });
})

app.listen(port, function(){
  console.log('running '+port)
})
