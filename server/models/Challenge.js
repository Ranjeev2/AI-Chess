const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  fen: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Challenge', ChallengeSchema);

