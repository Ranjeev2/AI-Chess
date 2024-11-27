import React from 'react';
import { Button, Select, MenuItem, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const GameControls = ({ onBack, difficulty, setDifficulty, gameOver, winner, resetGame }) => {
  return (
    <Box className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 p-4 bg-gray-900 rounded-lg shadow-md">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        variant="outlined"
        color="primary"
        className="w-full md:w-auto"
      >
        Back
      </Button>

      <Select
        value={difficulty}
        onChange={(e) => setDifficulty(Number(e.target.value))}
        variant="outlined"
        className="w-full md:w-48"
      >
        {[1, 2, 3, 4, 5].map((level) => (
          <MenuItem key={level} value={level}>
            Difficulty {level}
          </MenuItem>
        ))}
      </Select>

      {gameOver && (
        <Box className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <Typography
            variant="h6"
            className="text-center md:text-left font-bold text-white"
          >
            {winner === 'Draw' ? 'Game Draw!' : `${winner} Wins!`}
          </Typography>

          <Button
            startIcon={<RestartAltIcon />}
            onClick={resetGame}
            variant="contained"
            color="success"
            className="w-full md:w-auto"
          >
            New Game
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default GameControls;