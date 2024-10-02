const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String
});

module.exports = mongoose.model('User', userSchema);