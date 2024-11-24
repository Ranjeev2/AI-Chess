import React from 'react';

const GameControls = ({ onBack, difficulty, setDifficulty, gameOver, winner, resetGame }) => {
  return (
    <div className="mb-4 flex items-center space-x-4">
      <button onClick={onBack} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Back
      </button>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(Number(e.target.value))}
        className="px-4 py-2 border rounded"
      >
        {[1, 2, 3, 4, 5].map((level) => (
          <option key={level} value={level}>
            Difficulty {level}
          </option>
        ))}
      </select>
      {gameOver && (
        <>
          <div className="text-xl font-bold">
            {winner === 'Draw' ? 'Game Draw!' : `${winner} Wins!`}
          </div>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            New Game
          </button>
        </>
      )}
    </div>
  );
};

export default GameControls;

