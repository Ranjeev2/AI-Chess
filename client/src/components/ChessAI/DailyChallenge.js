import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { AlertCircle, CheckCircle, XCircle, Loader2 } from 'lucide-react';

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
          if (newGame.isCheckmate()) {
            setResult(isUserWin ? 'userWin' : 'aiWin');
            setMessage(isUserWin
              ? 'Checkmate! Congratulations! You won the challenge!'
              : 'Checkmate! AI wins! Better luck next time.'
            );
          } else {
            setResult('draw');
            setMessage('The game ended in a draw!');
          }
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

  function onDrop(sourceSquare, targetSquare) {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    };

    makeMove(move);
    return true;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-lg font-semibold text-gray-700">Loading challenge...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 px-6 sm:px-10">
            <h2 className="text-3xl font-extrabold text-white">Daily Chess Challenge</h2>
            <p className="mt-1 text-lg text-blue-100">Play against the AI and test your skills!</p>
          </div>
          
          <div className="p-6 sm:p-10">
            <div className="max-w-[600px] mx-auto mb-8">
              <Chessboard
                position={game.fen()}
                onPieceDrop={onDrop}
                boardWidth={600}
                customDarkSquareStyle={{ backgroundColor: '#4A5568' }}
                customLightSquareStyle={{ backgroundColor: '#EDF2F7' }}
              />
            </div>

            {message && (
              <div
                className={`mt-4 p-4 rounded-lg text-center ${
                  result === 'userWin'
                    ? 'bg-green-100 text-green-800'
                    : result === 'aiWin'
                    ? 'bg-red-100 text-red-800'
                    : result === 'draw'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {result === 'userWin' && <CheckCircle className="w-6 h-6" />}
                  {result === 'aiWin' && <XCircle className="w-6 h-6" />}
                  {result === 'draw' && <AlertCircle className="w-6 h-6" />}
                  {!result && <AlertCircle className="w-6 h-6" />}
                  <span className="text-lg font-medium">{message}</span>
                </div>
              </div>
            )}

            {challengeCompleted && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  <span className="text-lg font-semibold">Challenge completed successfully!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;

