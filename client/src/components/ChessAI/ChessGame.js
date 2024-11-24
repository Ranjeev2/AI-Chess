import React, { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
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

  const checkGameStatus = useCallback(() => {
    if (chess.isGameOver()) {
      setGameOver(true);
      if (chess.isCheckmate()) {
        setWinner(chess.turn() === 'w' ? 'AI' : 'Player');
      } else if (chess.isDraw()) {
        setWinner('Draw');
      }
      return true;
    }
    return false;
  }, [chess]);

  const makeAIMove = useCallback(() => {
    if (chess.turn() === 'b' && !gameOver) {
      setIsThinking(true);
      setTimeout(() => {
        const bestMove = selectBestMove(chess, difficulty);
        if (bestMove) {
          chess.move(bestMove);
          setFen(chess.fen());
          checkGameStatus();
        }
        setIsThinking(false);
      }, 500);
    }
  }, [chess, gameOver, difficulty, checkGameStatus]);

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
        <div className="mb-4 text-red-500 font-bold">{errorMessage}</div>
      )}
      <ChessboardUI 
        fen={fen} 
        onDrop={onDrop} 
        gameOver={gameOver} 
        isThinking={isThinking}
      />
      {isThinking && <div className="mt-4 text-xl">AI is thinking...</div>}
    </div>
  );
};

export default ChessGame;

