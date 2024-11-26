import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

const DailyChallenge = () => {
  const [game, setGame] = useState(new Chess());
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  useEffect(() => {
    const fetchInitialPosition = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/challenges/today', { withCredentials: true });
        const challengeData = response.data;

        setGame(new Chess(challengeData.initialPosition));
        setMessage('Challenge started! Make your first move.');
      } catch (error) {
        console.error('Error fetching initial position:', error);
        setMessage('Error loading challenge. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPosition();
  }, []);

  const makeMove = async (move) => {
    const newGame = new Chess(game.fen());
    const result = newGame.move(move);

    if (result) {
      setGame(newGame);

      try {
        const response = await axios.post('http://localhost:5000/api/challenges/ai-move', {
          fen: newGame.fen(),
        }, { withCredentials: true });

        const { aiMove, isGameOver, isUserWin } = response.data;
        newGame.move(aiMove);
        setGame(new Chess(newGame.fen()));

        if (isGameOver) {
          setResult(isUserWin ? 'userWin' : 'aiWin');
          setMessage(isUserWin
            ? 'Congratulations! You won the challenge!'
            : 'AI wins! Better luck next time.'
          );
          if (isUserWin) setChallengeCompleted(true);
        }
      } catch (error) {
        console.error('Error getting AI move:', error);
        setMessage('Error getting AI move. Please try again.');
      }
    } else {
      setMessage('Invalid move. Please try again.');
    }
  };

// ============

};

export default DailyChallenge;
