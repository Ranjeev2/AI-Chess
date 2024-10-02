// /routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// Protected route to get the current user
router.get('/current_user', ensureAuthenticated, (req, res) => {
  res.send(req.user);
});

module.exports = router;
