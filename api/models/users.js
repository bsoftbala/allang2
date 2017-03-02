var mongoose = require('mongoose');
//const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  }
});
const User = module.exports = mongoose.model('User', UserSchema);


module.exports.addUser = function(newUser, callback){
  newUser.save(callback);
}
