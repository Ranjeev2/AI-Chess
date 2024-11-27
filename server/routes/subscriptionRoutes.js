const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.post('/subscribe', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.isSubscribed = true;
    await user.save();
    res.json({ message: 'Successfully subscribed to daily challenges!' });
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ error: 'An error occurred while subscribing' });
  }
});

router.post('/unsubscribe', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.isSubscribed = false;
    await user.save();
    res.json({ message: 'Successfully unsubscribed from daily challenges.' });
  } catch (error) {
    console.error('Error unsubscribing:', error);
    res.status(500).json({ error: 'An error occurred while unsubscribing' });
  }
});

module.exports = router;

