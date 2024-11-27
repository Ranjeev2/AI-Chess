// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const passport = require('passport');
// const session = require('express-session');
// require('dotenv').config();
// require('./config/passport');

// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors({ 
//   origin: 'http://localhost:3001', 
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     httpOnly: true,
//     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
//   }
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // Connect to MongoDB 
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Routes
// app.use('/auth', authRoutes);
// app.use('/api', userRoutes);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const passport = require('passport');
// const session = require('express-session');
// const gameRoutes = require('./routes/gameRoutes');
// const { scheduleDailyChallenges, sendTestEmail } = require('./services/emailService');

// require('./config/passport');

// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const subscriptionRoutes = require('./routes/subscriptionRoutes');

// const app = express();
// const PORT = 5000; // Hardcoded PORT

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend URL
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
//   // origin: '*', 
//   // credentials: true,
//   // methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   // allowedHeaders: ['Content-Type', 'Authorization'];
// app.use(express.json());
// app.use(session({
//   secret: 'some_random_strings', // Hardcoded secret
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // Adjust this to true if using HTTPS
//     httpOnly: true,
//     sameSite: 'lax' // Adjust accordingly
//   }
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use('/api/game', gameRoutes);

// // Connect to MongoDB 
// mongoose.connect("mongodb+srv://aryansharma21:CheckMate123@cluster0.ufwqm.mongodb.net/CheckMate?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Routes
// app.use('/auth', authRoutes);
// app.use('/api', userRoutes);
// app.use('/uploads', express.static('uploads'));
// app.use('/api/subscription', subscriptionRoutes);
// app.post('/api/send-test-email', async (req, res) => {
//   const { email } = req.body;
//   if (!email) {
//     return res.status(400).json({ error: 'Email is required' });
//   }
//   try {
//     await sendTestEmail(email);
//     res.json({ message: 'Test email sent successfully' });
//   } catch (error) {
//     console.error('Error sending test email:', error);
//     res.status(500).json({ error: 'An error occurred while sending the test email' });
//   }
// });
// // Start the email scheduler
// scheduleDailyChallenges();

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const passport = require('passport');
// const session = require('express-session');
// const gameRoutes = require('./routes/gameRoutes');
// const { scheduleDailyChallenges, sendTestEmail } = require('./services/emailService');
// const challengeRoutes = require('./routes/challengeRoutes');
// const newsletterRoutes = require('./routes/newsletterRoutes');

// require('./config/passport');

// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const subscriptionRoutes = require('./routes/subscriptionRoutes');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());
// app.use(session({
//   secret: 'some_random_strings',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false,
//     httpOnly: true,
//     sameSite: 'lax'
//   }
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use('/api/game', gameRoutes);
// app.use('/api/challenges', challengeRoutes);
// app.use('/api/newsletter', newsletterRoutes);

// // Connect to MongoDB 
// mongoose.connect("mongodb+srv://aryansharma21:CheckMate123@cluster0.ufwqm.mongodb.net/CheckMate?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Routes
// app.use('/auth', authRoutes);
// app.use('/api', userRoutes);
// app.use('/api/subscription', subscriptionRoutes);
// app.use('/uploads', express.static('uploads'));

// app.post('/api/send-test-email', async (req, res) => {
//   const { email } = req.body;
//   if (!email) {
//     return res.status(400).json({ error: 'Email is required' });
//   }
//   try {
//     await sendTestEmail(email);
//     res.json({ message: 'Test email sent successfully' });
//   } catch (error) {
//     console.error('Error sending test email:', error);
//     res.status(500).json({ error: 'An error occurred while sending the test email' });
//   }
// });

// // Start the email scheduler
// scheduleDailyChallenges();

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const gameRoutes = require('./routes/gameRoutes');
// const { scheduleDailyChallenges, sendTestEmail } = require('./services/emailService');
// const challengeRoutes = require('./routes/challengeRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

require('./config/passport');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(session({
  secret: 'some_random_strings',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/game', gameRoutes);
// app.use('/api/challenges', challengeRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Connect to MongoDB 
mongoose.connect("mongodb+srv://aryansharma21:CheckMate123@cluster0.ufwqm.mongodb.net/CheckMate?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/subscription', subscriptionRoutes);

app.post('/api/send-test-email', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  try {
    await sendTestEmail(email);
    res.json({ message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ error: 'An error occurred while sending the test email' });
  }
});

// Start the email scheduler
// scheduleDailyChallenges();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

