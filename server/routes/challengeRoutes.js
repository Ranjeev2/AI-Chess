const express = require('express');
const router = express.Router();
const DailyChallenge = require('../models/dailyChallenge');
const ChallengeAttempt = require('../models/challengeAttempt');
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const { validateMove, generateDailyChallenge } = require('../services/challengeService');
const { findBestMove } = require('../services/minmaxai');
const { Chess } = require('chess.js');

// router.get('/today', ensureAuthenticated, async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     let challenge = await DailyChallenge.findOne({ date: { $gte: today } });
//     if (!challenge) {
//       challenge = await generateDailyChallenge();
//     }
//     res.json(challenge);
//   } catch (error) {
//     console.error('Error fetching daily challenge:', error);
//     res.status(500).json({ message: 'Error fetching daily challenge', error: error.message });
//   }
// });

router.get('/today', ensureAuthenticated, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let challenge = await DailyChallenge.findOne({ date: { $gte: today } });
    if (!challenge) {
      challenge = await generateDailyChallenge();
      await challenge.save();
    }
    res.json(challenge);
  } catch (error) {
    console.error('Error fetching daily challenge:', error);
    res.status(500).json({ message: 'Error fetching daily challenge', error: error.message });
  }
});

router.post('/attempt', ensureAuthenticated, async (req, res) => {
  try {
    const { challengeId, move, gameState } = req.body;
    if (!challengeId || !move || !gameState) {
      return res.status(400).json({ message: 'Challenge ID, move, and game state are required' });
    }

    const challenge = await DailyChallenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    const chess = new Chess(gameState);
    
    // Validate and make the move
    const moveResult = chess.move(move);
    if (!moveResult) {
      return res.status(400).json({ message: 'Invalid move' });
    }

    const isGameOver = chess.isGameOver();
    const isWin = chess.isCheckmate() && chess.turn() === 'b'; // Check if it's checkmate and it's black's turn (meaning white won)

    let attempt = await ChallengeAttempt.findOne({ user: req.user._id, challenge: challengeId });
    if (!attempt) {
      attempt = new ChallengeAttempt({
        user: req.user._id,
        challenge: challengeId,
        completed: isWin,
        result: isWin ? 'win' : (isGameOver ? 'loss' : 'incomplete'),
        moves: [move]
      });
    } else {
      attempt.moves.push(move);
      if (isWin) {
        attempt.completed = true;
        attempt.result = 'win';
      } else if (isGameOver) {
        attempt.result = 'loss';
      }
    }

    await attempt.save();

    res.json({ 
      isGameOver,
      isWin,
      message: isWin ? 'Congratulations! You completed the daily challenge!' : 
               (isGameOver ? 'Game over. Try again tomorrow!' : 'Move recorded.'),
      newState: chess.fen()
    });
  } catch (error) {
    console.error('Error processing move:', error);
    res.status(500).json({ message: 'Error processing move', error: error.message });
  }
});

router.post('/ai-move', ensureAuthenticated, async (req, res) => {
  try {
    const { fen } = req.body;
    if (!fen) {
      return res.status(400).json({ message: 'FEN is required' });
    }

    const chess = new Chess(fen);
    const bestMove = findBestMove(chess);
    if (!bestMove) {
      return res.status(400).json({ message: 'No valid move found' });
    }
    
    chess.move(bestMove);
    const isGameOver = chess.isGameOver();
    const isUserWin = chess.isCheckmate() && chess.turn() === 'w'; // Check if it's checkmate and it's white's turn (meaning black won)

    res.json({ 
      aiMove: bestMove,
      newState: chess.fen(),
      isGameOver,
      isUserWin
    });
  } catch (error) {
    console.error('Error getting AI move:', error);
    res.status(500).json({ message: 'Error getting AI move', error: error.message });
  }
});

module.exports = router;

