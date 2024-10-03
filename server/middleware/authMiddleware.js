// // /middleware/authMiddleware.js

// // Middleware to check if the user is authenticated
// const ensureAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.status(401).send('You must log in first.');
//   };
  
//   module.exports = { ensureAuthenticated };
  
// /middleware/authMiddleware.js

// Middleware to check if the user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('You must log in first.');
};

module.exports = { ensureAuthenticated };
