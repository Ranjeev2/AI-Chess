const express = require('express');
const router = express.Router();
const GameResult = require('../models/GameResult');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.post('/save-result', async (req, res) => {
  try {
    const { winner, difficulty } = req.body;
    const userId = req.user._id; // Assuming the user is authenticated


    const gameResult = new GameResult({
      user: userId,
      winner,
      difficulty,
    });

    await gameResult.save();
    res.status(201).json({ message: 'Game result saved successfully' });
  } catch (error) {
    console.error('Error saving game result:', error);
    res.status(500).json({ message: 'Error saving game result', error: error.message });
  }
});

// module.exports = router;

// Fetch game results for the logged-in user
router.get('/results', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from session
    const results = await GameResult.find({ user: userId }).sort({ date: -1 }); // Fetch and sort by date
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching game results:', error);
    res.status(500).json({ message: 'Error fetching game results', error: error.message });
  }
});

module.exports = router;
