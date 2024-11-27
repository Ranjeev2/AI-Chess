const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const { sendWelcomeEmail, sendUnsubscribeConfirmation, generateUnsubscribeToken } = require('../services/emailService');

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let subscriber = await Newsletter.findOne({ email });
    if (subscriber) {
      if (subscriber.isSubscribed) {
        return res.status(400).json({ error: 'Email is already subscribed' });
      } else {
        subscriber.isSubscribed = true;
        await subscriber.save();
        await sendWelcomeEmail(email);
        return res.status(200).json({ message: 'Successfully resubscribed to the newsletter' });
      }
    }

    subscriber = new Newsletter({ email, isSubscribed: true });
    await subscriber.save();

    // Send welcome email
    await sendWelcomeEmail(email);

    res.status(201).json({ message: 'Successfully subscribed to the newsletter' });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ error: 'An error occurred while subscribing to the newsletter' });
  }
});

router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const subscriber = await Newsletter.findOne({ email });
    if (!subscriber || !subscriber.isSubscribed) {
      return res.status(400).json({ error: 'Email is not subscribed' });
    }

    subscriber.isSubscribed = false;
    await subscriber.save();

    // Send unsubscribe confirmation email
    await sendUnsubscribeConfirmation(email);

    res.status(200).json({ message: 'Successfully unsubscribed from the newsletter' });
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    res.status(500).json({ error: 'An error occurred while unsubscribing from the newsletter' });
  }
});

router.get('/unsubscribe', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ error: 'Unsubscribe token is required' });
    }

    // Find the subscriber with the matching token
    const subscribers = await Newsletter.find({ isSubscribed: true });
    const subscriber = subscribers.find(sub => generateUnsubscribeToken(sub.email) === token);

    if (!subscriber) {
      return res.status(404).json({ error: 'Invalid unsubscribe token or subscriber not found' });
    }

    // Unsubscribe the user
    subscriber.isSubscribed = false;
    await subscriber.save();

    // Send unsubscribe confirmation email
    await sendUnsubscribeConfirmation(subscriber.email);

    res.status(200).json({ message: 'Successfully unsubscribed from the newsletter' });
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    res.status(500).json({ error: 'An error occurred while unsubscribing from the newsletter' });
  }
});

router.get('/status', async (req, res) => {
  try {
    // In a real application, you would get the user's email from the session or JWT token
    const userEmail = req.query.email; // For demonstration purposes, we're using a query parameter

    if (!userEmail) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const subscriber = await Newsletter.findOne({ email: userEmail });
    const isSubscribed = subscriber ? subscriber.isSubscribed : false;

    res.status(200).json({ isSubscribed });
  } catch (error) {
    console.error('Error checking subscription status:', error);
    res.status(500).json({ error: 'An error occurred while checking subscription status' });
  }
});

module.exports = router;

