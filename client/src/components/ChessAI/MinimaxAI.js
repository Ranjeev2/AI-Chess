// Remove the unused import
// import { Chess } from 'chess.js';

const pieceValues = {
    p: 100,
    n: 320,
    b: 330,
    r: 500,
    q: 900,
    k: 20000
  };
  
  const pawnEvalWhite = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
  ];
  
  const knightEval = [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
  ];
  
  const bishopEvalWhite = [
    [-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5, 10, 10,  5,  0,-10],
    [-10,  5,  5, 10, 10,  5,  5,-10],
    [-10,  0, 10, 10, 10, 10,  0,-10],
    [-10, 10, 10, 10, 10, 10, 10,-10],
    [-10,  5,  0,  0,  0,  0,  5,-10],
    [-20,-10,-10,-10,-10,-10,-10,-20]
  ];
  
  const rookEvalWhite = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [5, 10, 10, 10, 10, 10, 10,  5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [0,  0,  0,  5,  5,  0,  0,  0]
  ];
  
  const evalQueen = [
    [-20,-10,-10, -5, -5,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5,  5,  5,  5,  0,-10],
    [-5,  0,  5,  5,  5,  5,  0, -5],
    [0,  0,  5,  5,  5,  5,  0, -5],
    [-10,  5,  5,  5,  5,  5,  0,-10],
    [-10,  0,  5,  0,  0,  0,  0,-10],
    [-20,-10,-10, -5, -5,-10,-10,-20]
  ];
  
  const kingEvalWhite = [
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-20,-30,-30,-40,-40,-30,-30,-20],
    [-10,-20,-20,-20,-20,-20,-20,-10],
    [20, 20,  0,  0,  0,  0, 20, 20],
    [20, 30, 10,  0,  0, 10, 30, 20]
  ];
  
  // Simple position evaluation function
  function evaluateBoard(board) {
    let totalEvaluation = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        totalEvaluation += getPieceValue(board[i][j], i, j);
      }
    }
    return totalEvaluation;
  }
  
  // Get the value of a piece based on its type and position
  function getPieceValue(piece, x, y) {
    if (piece === null) {
      return 0;
    }
    
    let positionBonus = 0;
    if (piece.type === 'p') {
      positionBonus = piece.color === 'w' ? pawnEvalWhite[y][x] : pawnEvalWhite[7-y][x];
    } else if (piece.type === 'r') {
      positionBonus = piece.color === 'w' ? rookEvalWhite[y][x] : rookEvalWhite[7-y][x];
    } else if (piece.type === 'n') {
      positionBonus = knightEval[y][x];
    } else if (piece.type === 'b') {
      positionBonus = piece.color === 'w' ? bishopEvalWhite[y][x] : bishopEvalWhite[7-y][x];
    } else if (piece.type === 'q') {
      positionBonus = evalQueen[y][x];
    } else if (piece.type === 'k') {
      positionBonus = piece.color === 'w' ? kingEvalWhite[y][x] : kingEvalWhite[7-y][x];
    }
  
    const absoluteValue = pieceValues[piece.type] + positionBonus;
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
  }
  
  // Minimax function with alpha-beta pruning
  function minimax(chess, depth, alpha, beta, maximizingPlayer) {
    if (depth === 0 || chess.isGameOver()) {
      return -evaluateBoard(chess.board());
    }
  
    const moves = chess.moves({ verbose: true });
  
    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (let move of moves) {
        chess.move(move);
        const evaluation = minimax(chess, depth - 1, alpha, beta, false);
        chess.undo();
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) {
          break;
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let move of moves) {
        chess.move(move);
        const evaluation = minimax(chess, depth - 1, alpha, beta, true);
        chess.undo();
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) {
          break;
        }
      }
      return minEval;
    }
  }
  
  export function findBestMove(chess, depth = 3) {
    let bestMove = null;
    let bestEval = -Infinity;
    const moves = chess.moves({ verbose: true });
  
    for (let move of moves) {
      chess.move(move);
      const evaluation = minimax(chess, depth - 1, -Infinity, Infinity, false);
      chess.undo();
  
      if (evaluation > bestEval) {
        bestEval = evaluation;
        bestMove = move;
      }
    }
  
    return bestMove;
  }
  
  