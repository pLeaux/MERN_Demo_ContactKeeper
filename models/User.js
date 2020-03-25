const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String, 
    required: true
  }, 
  email: {
    type: String, 
    required: true,
    unique: true
  }, 
  password: {
    type: String, 
    required: true
  }, 
  date: {
    type: Date,
    defaut: Date.now()
  } 
});

module.exports = mongoose.model('User', UserSchema) ; // 1st param defines model class ("User") and DB table name ("users": small + plural)