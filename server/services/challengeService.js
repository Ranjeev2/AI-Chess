const DailyChallenge = require('../models/dailyChallenge');
const { Chess } = require('chess.js');

const puzzlePositions = [
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',
    solution: ['d2d4'],
    description: 'Control the center'
  },
  {
    fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
    solution: ['g1f3'],
    description: 'Develop your pieces'
  },
  {
    fen: 'rnbqkbnr/pppp1ppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 3 4',
    solution: ['e4e5'],
    description: 'Advance your pawn to gain space and restrict opponent'
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/8/8/4P3/2P5/PPP2PPP/R1BQKBNR w KQkq - 0 5',
    solution: ['c4c5'],
    description: 'Expand on the queenside and gain central control'
  },
  {
    fen: 'rnbqkbnr/pppp2pp/8/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 2 4',
    solution: ['Bf4'],
    description: 'Pin the knight and gain a better piece placement'
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/8/8/4P3/1P6/1PP2PPP/RNBQKBNR w KQkq - 1 5',
    solution: ['b4b5'],
    description: 'Push the pawn to gain space and restrict your opponent'
  },
  {
    fen: 'rnbqkbnr/ppp2ppp/8/4p3/1P2P3/8/P1P2PPP/RNBQKBNR w KQkq - 0 6',
    solution: ['a4a5'],
    description: 'Prepare to push a pawn on the queenside for long-term advantage'
  },
  {
    fen: 'r1bqkbnr/pppp1ppp/8/8/4P3/2B2N2/5P2/PPPP1PPP/RNBQK1NR w KQkq - 0 5',
    solution: ['Nf3'],
    description: 'Bring the knight out to attack and develop pieces rapidly'
  },
  {
    fen: 'rnbqkbnr/pppp1ppp/8/8/4P3/5N2/PPP2PPP/RNBQKB1R w KQkq - 3 4',
    solution: ['Ng5'],
    description: 'Aggressive knight placement threatening to attack f7'
  },
  {
    fen: 'rnbqkbnr/pppp2pp/8/4p3/1B2P3/2N5/PPP2PPP/R1BQK1NR w KQkq - 1 5',
    solution: ['Bxc7+'],
    description: 'Exploit the weak back rank and check the opponent’s king'
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 5',
    solution: ['Ng5'],
    description: 'Play for an aggressive attack on the kingside, threatening a quick mate'
  },
  {
    fen: 'rnbqkbnr/ppp2ppp/8/4p3/2B1P3/2P5/PP1Q1PPP/R1B1K1NR w KQkq - 1 6',
    solution: ['Qf3'],
    description: 'Pin the knight on f6 and prepare for a decisive attack'
  },
  {
    fen: 'r1bqkbnr/pp1ppppp/8/3p4/2pP4/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 5',
    solution: ['Nxf7+'],
    description: 'Sacrifice to exploit the opponent’s kingside weaknesses'
  },
  {
    fen: 'r1bqkbnr/pppppppp/8/8/8/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 5',
    solution: ['Nf3'],
    description: 'Develop your knight to prepare for kingside attacks'
  },
  {
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/2B1P3/2P5/PP1Q1PPP/R1B1K1NR w KQkq - 1 6',
    solution: ['Qf3'],
    description: 'Pin the knight on f6 and prepare for a decisive attack'
  },
  {
    fen: 'r1bqkbnr/pppppppp/8/8/8/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 5',
    solution: ['Nf3'],
    description: 'Play for rapid development and kingside attack potential'
  },
  {
    fen: 'rnbqkbnr/pppppppp/8/8/8/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 5',
    solution: ['Nf3'],
    description: 'Develop your knight to prepare for kingside attacks'
  },
  // More complex puzzles can be added here
];

const generateDailyChallenge = async () => {
  const puzzle = puzzlePositions[Math.floor(Math.random() * puzzlePositions.length)];
  
  const challenge = new DailyChallenge({
    date: new Date(),
    initialPosition: puzzle.fen,
    solution: puzzle.solution,
    description: puzzle.description,
    difficulty: 'medium'
  });

  await challenge.save();
  return challenge;
};

const validateMove = (fen, move, solution) => {
  const chess = new Chess(fen);
  try {
    // Remove the promotion part from the move if it's present
    const cleanMove = move.replace(/[qrbn]$/, '');
    const moveResult = chess.move(cleanMove, { sloppy: true });
    if (!moveResult) return false;
    
    const standardMove = `${moveResult.from}${moveResult.to}`;
    return solution.includes(standardMove);
  } catch (error) {
    console.error('Error validating move:', error);
    return false;
  }
};

module.exports = { generateDailyChallenge, validateMove };
