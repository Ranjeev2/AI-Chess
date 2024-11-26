import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  TableContainer, 
  Paper,
  Chip,
  Box,
  Container,
  CircularProgress,
  Alert,
  IconButton,
  Snackbar
} from '@mui/material';
import { 
  EmojiEvents as TrophyIcon,
  Games as GamepadIcon,
  Timeline as TargetIcon,
  Schedule as ClockIcon,
  CameraAlt as CameraAltIcon,
  DeleteForever as DeleteIcon

} from '@mui/icons-material';
import DeleteAccountButton from './DeleteAccountButton'; // Import the new component

const Profile = ({ user }) => {
  const [gameResults, setGameResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || 'default-avatar.png');
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
 
  useEffect(() => {
    const fetchGameResults = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/game/results', {
          credentials: 'include'
        });
        const data = await response.json();
        setGameResults(data);
      } catch (err) {
        console.error('Error fetching game results:', err);
        setError('Failed to load game results. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGameResults();
  }, []);

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setNotification({
        open: true,
        message: 'File size too large. Please choose an image under 5MB.',
        severity: 'error'
      });
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      setNotification({
        open: true,
        message: 'Please select an image file.',
        severity: 'error'
      });
      return;
    }

    const formData = new FormData();
    formData.append('profilePhoto', file);

    setUploading(true);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/update-profile-photo', 
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setProfilePhoto(response.data.profilePhoto);
      setNotification({
        open: true,
        message: 'Profile photo updated successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error uploading photo:', error);
      setNotification({
        open: true,
        message: 'Failed to update profile photo. Please try again.',
        severity: 'error'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const totalGames = gameResults.length;
  const wins = gameResults.filter(game => game.winner.toLowerCase() === 'win').length;
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

  const stats = [
    { label: 'Games Played', value: totalGames, icon: GamepadIcon },
    { label: 'Wins', value: wins, icon: TrophyIcon },
    { label: 'Win Rate', value: `${winRate}%`, icon: TargetIcon },
    { 
      label: 'Last Played', 
      value: gameResults[0]?.date ? 
        new Date(gameResults[0].date).toLocaleDateString() : 
        'Never', 
      icon: ClockIcon 
    }
  ];

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        backgroundColor: '#18202F',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' } }}>
            <Card 
              elevation={4}
              sx={{
                backgroundColor: '#1E2736',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                {/* Add Delete Account Button */}
                 
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                  <Box 
                    component="img"
                    src={`http://localhost:5000/uploads/profiles/${profilePhoto}`}
                    alt="Profile"
                    sx={{
                      width: 128,
                      height: 128,
                      borderRadius: '50%',
                      border: '4px solid',
                      borderColor: 'primary.main',
                      transition: 'transform 0.3s ease',
                      objectFit: 'cover',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 1
                    }}
                  >
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="photo-upload"
                      type="file"
                      onChange={handlePhotoUpload}
                      disabled={uploading}
                    />
                    <label htmlFor="photo-upload">
                      <IconButton
                        component="span"
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          },
                          '&.Mui-disabled': {
                            backgroundColor: 'rgba(0, 0, 0, 0.12)',
                          }
                        }}
                        disabled={uploading}
                      >
                        {uploading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          <CameraAltIcon />
                        )}
                      </IconButton>
                    </label>
                  </Box>
                </Box>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  sx={{ 
                    color: '#FFFFFF',
                    fontWeight: 700,
                    mb: 1
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <DeleteAccountButton />
                </Box>
                  {user.name}
                </Typography>
                <Typography 
                  sx={{ 
                    color: '#FFFFFF',
                    fontSize: '1rem',
                    fontWeight: 500,
                    opacity: 0.8
                  }}
                >
                  {user.email}
                </Typography>
              </CardContent>
            </Card>

            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr 1fr', lg: 'repeat(4, 1fr)' }, 
                gap: 2 
              }}
            >
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  elevation={4}
                  sx={{
                    backgroundColor: '#1E2736',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <stat.icon 
                      sx={{ 
                        fontSize: 40, 
                        color: '#FFFFFF',
                        mb: 1
                      }} 
                    />
                    <Typography 
                      sx={{ 
                        color: '#FFFFFF',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        mb: 1,
                        opacity: 0.8
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: '#FFFFFF',
                        fontSize: '1.5rem',
                        fontWeight: 700
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>

          <Card 
            elevation={4}
            sx={{
              backgroundColor: '#1E2736',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <CardContent>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#FFFFFF',
                  fontWeight: 700,
                  mb: 3
                }}
              >
                Recent Games
              </Typography>

              {error ? (
                <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
              ) : loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : gameResults.length === 0 ? (
                <Typography 
                  align="center" 
                  sx={{ 
                    py: 4,
                    color: '#FFFFFF',
                    fontWeight: 500,
                    opacity: 0.8
                  }}
                >
                  No games played yet. Start playing to see your results here!
                </Typography>
              ) : (
                <TableContainer 
                  component={Paper} 
                  sx={{ 
                    backgroundColor: 'transparent',
                    '& .MuiTableCell-root': {
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                      fontSize: '1rem',
                      fontWeight: 500
                    }
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' }}>
                          Result
                        </TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' }}>
                          Difficulty
                        </TableCell>
                        <TableCell sx={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' }}>
                          Date & Time
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {gameResults.map((result, index) => (
                        <TableRow 
                          key={index}
                          sx={{ 
                            '&:hover': { 
                              backgroundColor: 'rgba(255, 255, 255, 0.03)' 
                            }
                          }}
                        >
                          <TableCell>
                            <Chip
                              label={result.winner}
                              color={result.winner.toLowerCase() === 'win' ? 'success' : 'error'}
                              sx={{ 
                                minWidth: 75,
                                fontWeight: 600,
                                fontSize: '0.875rem'
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={result.difficulty}
                              color="primary"
                              sx={{ 
                                minWidth: 75,
                                fontWeight: 600,
                                fontSize: '0.875rem'
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>
                            {new Date(result.date).toLocaleString('en-US', {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Box>
        
      </Container>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;