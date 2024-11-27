import React, { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import axios from 'axios';
import ChessboardUI from './ChessboardUI';
import GameControls from './GameControls';
import { selectBestMove } from './AIUtils';

const ChessGame = ({ user, onBack }) => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [difficulty, setDifficulty] = useState(3);
  const [isThinking, setIsThinking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [capturedPieces, setCapturedPieces] = useState({ w: [], b: [] });
  const [isSaving, setIsSaving] = useState(false);

  const saveGameResult = useCallback(async (gameWinner) => {
    setIsSaving(true);
    setErrorMessage('');
    try {
      await axios.post('http://localhost:5000/api/game/save-result', {
        winner: gameWinner,
        difficulty,
      }, {
        withCredentials: true
      });
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving game result:', error);
      setErrorMessage('Failed to save game result. Please try again.');
      setIsSaving(false);
    }
  }, [difficulty]);

  const retrySaveGameResult = useCallback(() => {
    if (winner) {
      saveGameResult(winner);
    }
  }, [winner, saveGameResult]);

  const checkGameStatus = useCallback(() => {
    if (chess.isGameOver()) {
      setGameOver(true);
      let gameWinner;
      if (chess.isCheckmate()) {
        gameWinner = chess.turn() === 'w' ? 'AI' : 'User';
        setWinner(gameWinner);
      } else if (chess.isDraw()) {
        gameWinner = 'Draw';
        setWinner('Draw');
      }
      saveGameResult(gameWinner);
      return true;
    }
    return false;
  }, [chess, saveGameResult]);

  const updateCapturedPieces = useCallback((move) => {
    if (move.captured) {
      setCapturedPieces(prev => {
        const capturedColor = move.color === 'w' ? 'b' : 'w';
        return {
          ...prev,
          [capturedColor]: [...prev[capturedColor], move.captured]
        };
      });
    }
  }, []);

  const makeAIMove = useCallback(() => {
    if (chess.turn() === 'b' && !gameOver) {
      setIsThinking(true);
      setTimeout(() => {
        const bestMove = selectBestMove(chess, difficulty);
        if (bestMove) {
          const move = chess.move(bestMove);
          setFen(chess.fen());
          updateCapturedPieces(move);
          checkGameStatus();
        }
        setIsThinking(false);
      }, 500);
    }
  }, [chess, gameOver, difficulty, checkGameStatus, updateCapturedPieces]);

  const onDrop = ({ sourceSquare, targetSquare }) => {
    if (gameOver || isThinking) return;

    try {
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) {
        setErrorMessage("Invalid move. Please try again.");
        return;
      }

      setFen(chess.fen());
      updateCapturedPieces(move);
      setErrorMessage('');
      if (!checkGameStatus()) {
        makeAIMove();
      }
    } catch (error) {
      console.error('Error making move:', error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const resetGame = () => {
    chess.reset();
    setFen(chess.fen());
    setGameOver(false);
    setWinner(null);
    setIsThinking(false);
    setErrorMessage('');
    setCapturedPieces({ w: [], b: [] });
  };

  useEffect(() => {
    if (chess.turn() === 'b' && !gameOver && !isThinking && !errorMessage) {
      makeAIMove();
    }
  }, [makeAIMove, gameOver, chess, isThinking, errorMessage]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <GameControls
        onBack={onBack}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        gameOver={gameOver}
        winner={winner}
        resetGame={resetGame}
      />
      {errorMessage && (
        <div className="mb-4 text-red-500 font-bold" role="alert">
          {errorMessage}
          {gameOver && (
            <button
              onClick={retrySaveGameResult}
              className="ml-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isSaving}
            >
              {isSaving ? 'Retrying...' : 'Retry Saving'}
            </button>
          )}
        </div>
      )}
      <ChessboardUI 
        fen={fen} 
        onDrop={onDrop} 
        gameOver={gameOver} 
        isThinking={isThinking}
        capturedPieces={capturedPieces}
      />
      {isThinking && (
        <div className="mt-4 text-xl" aria-live="polite">
          AI is thinking...
        </div>
      )}
      {isSaving && (
        <div className="mt-4 text-xl text-green-500" aria-live="polite">
          Saving game result...
        </div>
      )}
    </div>
  );
};

export default ChessGame;

