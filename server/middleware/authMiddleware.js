const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('You must log in first.');
};

module.exports = { ensureAuthenticated };
