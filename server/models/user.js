// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   googleId: String,
//   name: String,
//   email: String
// });

// module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   googleId: String,
//   name: String,
//   email: String,
//   profilePhoto: {
//     type: String,
//     default: 'default-avatar.png'
//   },
//   isSubscribed: {
//     type: Boolean,
//     default: false
//   }
// });

// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  isSubscribed: {
    type: Boolean,
    default: false
  },
  subscribedEmail: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('User', userSchema);

