// // /routes/authRoutes.js

// const express = require('express');
// const passport = require('passport');
// const router = express.Router();

// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect('http://localhost:3000');
//   }
// );

// router.get('/logout', (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error logging out' });
//     }
//     req.session.destroy((err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error destroying session' });
//       }
//       res.clearCookie('connect.sid'); // Clear the session cookie
//       res.status(200).json({ message: 'Logged out successfully' });
//     });
//   });
// });

// module.exports = router;

// /routes/authRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google authentication route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://localhost:3000');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error destroying session' });
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

// Login status route
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;
