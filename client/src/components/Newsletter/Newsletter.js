import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Box, Alert, Snackbar, Tab, Tabs } from '@mui/material';
import { Mail, CheckCircle, XCircle } from 'lucide-react';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/newsletter/status');
        setIsSubscribed(response.data.isSubscribed);
        setActiveTab(response.data.isSubscribed ? 1 : 0);
      } catch (error) {
        console.error('Error checking subscription status:', error);
      }
    };

    checkSubscriptionStatus();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/newsletter/subscribe', { email });
      setSnackbar({ open: true, message: 'Successfully subscribed to the newsletter!', severity: 'success' });
      setIsSubscribed(true);
      setActiveTab(1);
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.error || 'An error occurred', severity: 'error' });
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await axios.post('http://localhost:5000/api/newsletter/unsubscribe', { email });
      setSnackbar({ open: true, message: 'Successfully unsubscribed from the newsletter!', severity: 'success' });
      setIsSubscribed(false);
      setEmail('');
      setActiveTab(0);
    } catch (error) {
      setSnackbar({ open: true, message: error.response?.data?.error || 'An error occurred', severity: 'error' });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="sm" className="py-12">
      <Box className="bg-gray-800 rounded-lg shadow-lg p-8">
        <Typography variant="h4" component="h1" className="text-center mb-6 text-white">
          Chess AI Newsletter
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          className="mb-6"
        >
          <Tab label="Subscribe" disabled={isSubscribed} />
          <Tab label="Unsubscribe" disabled={!isSubscribed} />
        </Tabs>
        {activeTab === 0 && (
          <form onSubmit={handleSubscribe} className="space-y-4">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <Mail className="mr-2 text-gray-400" />,
                className: "bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:border-blue-400",
              }}
            />
            <Button 
              type="submit"
              variant="contained" 
              fullWidth
              className="bg-blue-500 hover:bg-blue-600 text-white py-3"
              disabled={isSubscribed}
              startIcon={<CheckCircle />}
            >
              Subscribe
            </Button>
          </form>
        )}
        {activeTab === 1 && (
          <div className="space-y-4">
            <Typography variant="body1" className="text-center mb-4 text-gray-300">
              Are you sure you want to unsubscribe from our newsletter?
            </Typography>
            <Button 
              onClick={handleUnsubscribe}
              variant="contained" 
              fullWidth
              className="bg-red-500 hover:bg-red-600 text-white py-3"
              startIcon={<XCircle />}
            >
              Confirm Unsubscribe
            </Button>
          </div>
        )}
        <Typography variant="body2" className="mt-6 text-center text-gray-400">
          By subscribing, you agree to our <a href="/terms" className="text-blue-400 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>.
        </Typography>
      </Box>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NewsletterPage;

