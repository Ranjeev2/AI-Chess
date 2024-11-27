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

// router.post('/save-result', async (req, res) => {
//   try {
//       // Destructure the data from request body
//       const { userId, winner, difficulty } = req.body;

//       // Validate required fields
//       if (!userId || !winner || difficulty === undefined) {
//           return res.status(400).json({ message: 'User ID, winner, and difficulty are required.' });
//       }

//       // Validate `winner` value
//       const validWinners = ['User', 'AI', 'Draw'];
//       if (!validWinners.includes(winner)) {
//           return res.status(400).json({ message: 'Invalid winner value. Allowed values: User, AI, Draw.' });
//       }

//       // Validate `difficulty`
//       if (difficulty < 1 || difficulty > 5) {
//           return res.status(400).json({ message: 'Difficulty must be between 1 and 5.' });
//       }

//       // Create a new game result document
//       const newGameResult = new GameResult({
//           user: userId,
//           winner,
//           difficulty
//       });

//       // Save to the database
//       const savedResult = await newGameResult.save();

//       // Return success response
//       res.status(201).json({
//           message: 'Game result saved successfully.',
//           data: savedResult
//       });
//   } catch (error) {
//       console.error('Error saving game result:', error);
//       res.status(500).json({ message: 'Internal server error.' });
//   }
// });
// module.exports = router;

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

// router.get('/results', async (req, res) => {
//   try {
//     // Fetch results without checking authentication
//     const results = await GameResult.find().sort({ date: -1 }); // Fetch and sort by date
//     res.status(200).json(results);
//   } catch (error) {
//     console.error('Error fetching game results:', error);
//     res.status(500).json({ message: 'Error fetching game results', error: error.message });
//   }
// });

module.exports = router;
