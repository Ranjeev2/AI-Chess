import { findBestMove } from './MinimaxAI';

export const selectBestMove = (chess, difficulty) => {
  const depth = Math.min(difficulty + 1, 4); // Adjust depth based on difficulty, max 4
  return findBestMove(chess, depth);
};

