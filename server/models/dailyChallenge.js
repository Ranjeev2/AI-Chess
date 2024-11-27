const mongoose = require('mongoose');

const dailyChallengeSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  initialPosition: { type: String, required: true }, // FEN notation
  solution: [String], // Array of correct moves
  description: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DailyChallenge', dailyChallengeSchema);

