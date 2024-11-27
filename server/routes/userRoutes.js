// /routes/userRoutes.js

// const express = require('express');
// const router = express.Router();
// const { ensureAuthenticated } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const GameResult = require('../models/GameResult');
const User = require('../models/user');
const mongoose = require('mongoose');

router.get('/current_user', ensureAuthenticated, (req, res) => {
  res.send(req.user);
});


router.delete('/delete-account', ensureAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    
    // Delete profile photo if it exists and isn't the default
    if (user.profilePhoto && user.profilePhoto !== 'default-avatar.png') {
      const db = mongoose.connection.db;
      const bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: 'profile_photos'
      });
      try {
        await bucket.delete(new mongoose.Types.ObjectId(user.profilePhoto));
      } catch (deleteError) {
        console.error('Error deleting profile photo:', deleteError);
      }
    }

    // Delete user's game results
    await GameResult.deleteMany({ userId: user._id });
    
    // Delete the user
    await User.findByIdAndDelete(user._id);
    
    // Logout the user
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out after deletion' });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: 'Error destroying session' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Account deleted successfully' });
      });
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ 
      message: 'Error deleting account', 
      error: error.toString() 
    });
  }
});

module.exports = router;

