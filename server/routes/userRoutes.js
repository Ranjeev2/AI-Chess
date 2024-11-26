// /routes/userRoutes.js

// const express = require('express');
// const router = express.Router();
// const { ensureAuthenticated } = require('../middleware/authMiddleware');

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const GameResult = require('../models/GameResult'); // Adjust path to your GameResult model
const User = require('../models/user'); // Adjust path to your User model
const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');

// Protected route to get the current user
router.get('/current_user', ensureAuthenticated, (req, res) => {
  res.send(req.user);
});

// module.exports = router;

router.post('/update-profile-photo', ensureAuthenticated, upload.single('profilePhoto'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = req.user;
    
    // Delete old profile photo if it exists and isn't the default
    if (user.profilePhoto && user.profilePhoto !== 'default-avatar.png') {
      const oldPhotoPath = path.join(__dirname, '../uploads/profiles/', user.profilePhoto);
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }
    }

    // Update user profile photo in database
    user.profilePhoto = req.file.filename;
    await user.save();

    res.json({ 
      message: 'Profile photo updated successfully',
      profilePhoto: req.file.filename
    });
  } catch (error) {
    console.error('Error updating profile photo:', error);
    res.status(500).json({ message: 'Error updating profile photo' });
  }
});

// Serve profile photos
router.get('/profile-photo/:filename', (req, res) => {
  const filepath = path.join(__dirname, '../uploads/profiles/', req.params.filename);
  res.sendFile(filepath);
});

// In userRoutes.js
router.delete('/delete-account', ensureAuthenticated, async (req, res) => {
  try {
    const user = req.user;
    
    // Delete profile photo if it exists and isn't the default
    if (user.profilePhoto && user.profilePhoto !== 'default-avatar.png') {
      const photoPath = path.join(__dirname, '../uploads/profiles/', user.profilePhoto);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
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