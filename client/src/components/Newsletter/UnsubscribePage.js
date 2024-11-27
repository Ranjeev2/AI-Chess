import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Typography, Container, Box, CircularProgress } from '@mui/material';

const UnsubscribePage = () => {
  const [status, setStatus] = useState('loading');
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      if (!token) {
        setStatus('error');
        return;
      }

      try {
        await axios.get(`http://localhost:5000/api/newsletter/unsubscribe?token=${token}`);
        setStatus('success');
      } catch (error) {
        console.error('Error unsubscribing:', error);
        setStatus('error');
      }
    };

    unsubscribe();
  }, [location]);

  return (
    <Container maxWidth="sm" className="py-12">
      <Box className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        {status === 'loading' && (
          <>
            <CircularProgress className="mb-4" />
            <Typography variant="h5" className="text-white">Processing your unsubscribe request...</Typography>
          </>
        )}
        {status === 'success' && (
          <>
            <Typography variant="h4" className="text-white mb-4">Successfully Unsubscribed</Typography>
            <Typography variant="body1" className="text-gray-300">
              You have been unsubscribed from the Chess AI newsletter. We're sorry to see you go!
            </Typography>
          </>
        )}
        {status === 'error' && (
          <>
            <Typography variant="h4" className="text-white mb-4">Unsubscribe Error</Typography>
            <Typography variant="body1" className="text-gray-300">
              There was an error processing your unsubscribe request. Please try again or contact support.
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
};

export default UnsubscribePage;

