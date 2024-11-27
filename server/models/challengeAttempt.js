const mongoose = require('mongoose');

const challengeAttemptSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'DailyChallenge', required: true },
  completed: { type: Boolean, default: false },
  result: { type: String, enum: ['win', 'loss', 'incomplete'], required: true },
  moves: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChallengeAttempt', challengeAttemptSchema);

