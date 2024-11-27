import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  CircularProgress
} from '@mui/material';
import { DeleteForever as DeleteIcon } from '@mui/icons-material';

const DeleteAccountButton = () => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await axios.delete('http://localhost:5000/api/delete-account', {
        withCredentials: true
      });
      navigate('/home');
      window.location.reload(); // Refresh the page after navigation
    } catch (error) {
      console.error('Error deleting account:', error);
      setIsDeleting(false);
    }
  };

  return (
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
        sx={{
          borderRadius: 3,
          borderWidth: 2,
          fontWeight: 'bold',
          px: 3,
          py: 1.2,
          color: '#FF6B6B',
          borderColor: '#FF6B6B',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: '#FF6B6B',
            color: 'white',
            borderColor: '#FF6B6B'
          }
        }}
      >
        Delete Account
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: '#FFFFFF',
            color: '#333',
            borderRadius: 2,
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              textAlign: 'center',
              color: '#666',
              fontSize: '1rem',
              lineHeight: 1.5
            }}
          >
            Deleting your account will permanently remove all your data, including your
            game history and profile details. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            sx={{
              color: '#333',
              border: '1px solid #CCC',
              textTransform: 'none',
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#F4F4F4',
                borderColor: '#999'
              }
            }}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            variant="contained"
            sx={{
              backgroundColor: '#FF6B6B',
              color: 'white',
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 'bold',
              px: 3,
              py: 1,
              '&:hover': {
                backgroundColor: '#E64949'
              }
            }}
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteAccountButton;
