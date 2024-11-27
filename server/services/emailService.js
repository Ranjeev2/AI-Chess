const nodemailer = require('nodemailer');
const cron = require('node-cron');
const Challenge = require('../models/Challenge');
const Newsletter = require('../models/Newsletter');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'furnihub.co@gmail.com',
    pass: 'ilgmcjpdivdpnuis'
  }
});

// Function to generate a unique unsubscribe token
const generateUnsubscribeToken = (email) => {
  return crypto.createHash('sha256').update(email + process.env.UNSUBSCRIBE_SECRET).digest('hex');
};

const sendDailyChallenge = async (challenge) => {
  try {
    const subscribers = await Newsletter.find({ isSubscribed: true });
    
    for (const subscriber of subscribers) {
      const unsubscribeToken = generateUnsubscribeToken(subscriber.email);
      const unsubscribeLink = `http://localhost:3000/unsubscribe?token=${unsubscribeToken}`;

      const mailOptions = {
        from: 'furnihub.co@gmail.com',
        to: subscriber.email,
        subject: 'Daily Chess Challenge',
        html: `
          <h1>Daily Chess Challenge</h1>
          <p>Here's your daily chess challenge:</p>
          <p>Difficulty: ${challenge.difficulty}</p>
          <p>FEN: ${challenge.fen}</p>
          <p>Instructions: ${challenge.instructions}</p>
          <a href="http://localhost:3000/daily-challenge">Solve the challenge now!</a>
          <br><br>
          <p style="font-size: 12px; color: #666;">
            If you no longer wish to receive these emails, you can 
            <a href="${unsubscribeLink}">unsubscribe here</a>.
          </p>
        `
      };

      await transporter.sendMail(mailOptions);
    }
    console.log('Daily challenge emails sent successfully');
  } catch (error) {
    console.error('Error sending daily challenge emails:', error);
  }
};

const scheduleDailyChallenges = () => {
  cron.schedule('58 16 * * *', async () => {
    try {
      const challenge = await Challenge.findOne().sort({ createdAt: -1 });
      if (challenge) {
        await sendDailyChallenge(challenge);
      } else {
        console.log('No challenge found to send');
      }
    } catch (error) {
      console.error('Error scheduling daily challenge:', error);
    }
  });
};

const sendTestEmail = async (email) => {
  const unsubscribeToken = generateUnsubscribeToken(email);
  const unsubscribeLink = `http://localhost:3000/unsubscribe?token=${unsubscribeToken}`;

  const mailOptions = {
    from: 'furnihub.co@gmail.com',
    to: email,
    subject: 'Test Email from Chess AI',
    html: `
      <h1>Test Email</h1>
      <p>This is a test email from Chess AI. If you're receiving this, our email system is working correctly!</p>
      <br><br>
      <p style="font-size: 12px; color: #666;">
        If you no longer wish to receive these emails, you can 
        <a href="${unsubscribeLink}">unsubscribe here</a>.
      </p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('Error sending test email:', error);
    throw error;
  }
};

const sendWelcomeEmail = async (email) => {
  const unsubscribeToken = generateUnsubscribeToken(email);
  const unsubscribeLink = `http://localhost:3000/unsubscribe?token=${unsubscribeToken}`;

  const mailOptions = {
    from: 'furnihub.co@gmail.com',
    to: email,
    subject: 'Welcome to Chess AI Newsletter!',
    html: `
      <h1>Welcome to Chess AI Newsletter!</h1>
      <p>Thank you for subscribing to our newsletter. You'll receive the latest updates, tips, and challenges to improve your chess game.</p>
      <p>Stay tuned for exciting content!</p>
      <br><br>
      <p style="font-size: 12px; color: #666;">
        If you no longer wish to receive these emails, you can 
        <a href="${unsubscribeLink}">unsubscribe here</a>.
      </p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

const sendUnsubscribeConfirmation = async (email) => {
  const mailOptions = {
    from: 'furnihub.co@gmail.com',
    to: email,
    subject: 'Unsubscribed from Chess AI Newsletter',
    html: `
      <h1>Unsubscribed from Chess AI Newsletter</h1>
      <p>We're sorry to see you go! You have been successfully unsubscribed from the Chess AI newsletter.</p>
      <p>If you change your mind, you can always resubscribe by visiting our newsletter page.</p>
      <p>Thank you for your interest in Chess AI!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Unsubscribe confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending unsubscribe confirmation email:', error);
    throw error;
  }
};

module.exports = {
  scheduleDailyChallenges,
  sendTestEmail,
  sendWelcomeEmail,
  sendUnsubscribeConfirmation,
  generateUnsubscribeToken
};

