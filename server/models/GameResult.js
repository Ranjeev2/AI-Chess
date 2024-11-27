const mongoose = require('mongoose');

const gameResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  winner: {
    type: String,
    enum: ['User', 'AI', 'Draw'],
    required: true
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GameResult', gameResultSchema);

