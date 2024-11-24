import React from 'react';
import Chessboard from 'chessboardjsx';

const ChessboardUI = ({ 
  fen, 
  onDrop, 
  gameOver, 
  isThinking,
  orientation = 'white',
}) => {
  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const CoordinateLabel = ({ children, className = "" }) => (
    <div className={`text-gray-300 text-base ${className}`}>
      {children}
    </div>
  );

  const boardWidth = 640; 
  const squareSize = boardWidth / 8;

  return (
    <div className="w-full min-h-screen bg-[#1a1f2e] p-6">
      <div className="max-w-[1000px] mx-auto"> 
        {isThinking && (
          <div className="flex justify-center mb-6"> 
            <div className="px-5 py-2 rounded-full text-base font-medium bg-blue-500/10 text-blue-400"> 
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"/> 
                AI is thinking...
              </div>
            </div>
          </div>
        )}

        <div className="relative flex flex-col">
          {/* Top coordinates */}
          <div className="flex mb-2"> 
            <div className="w-10"/> 
            {columns.map((col) => (
              <CoordinateLabel key={`top-${col}`} className="w-20 text-center">
                {col}
              </CoordinateLabel>
            ))}
            <div className="w-10"/> 
          </div>

          <div className="flex">
            {/* Left coordinates */}
            <div className="flex flex-col justify-between w-10 pr-2"> 
              {rows.map((row) => (
                <CoordinateLabel key={`left-${row}`} className={`h-[${squareSize}px] flex items-center justify-end`}>
                  {row}
                </CoordinateLabel>
              ))}
            </div>

            {/* Chessboard */}
            <div>
              <Chessboard 
                position={fen}
                orientation={orientation}
                onDrop={onDrop}
                draggable={!gameOver && !isThinking}
                width={boardWidth}
                boardStyle={{
                  borderRadius: '8px', 
                  boxShadow: '0 0 50px rgba(0, 0, 0, 0.4)', 
                }}
                lightSquareStyle={{ backgroundColor: '#ffffff' }}
                darkSquareStyle={{ backgroundColor: '#334155' }}
                dropSquareStyle={{
                  boxShadow: 'inset 0 0 1px 4px rgb(59, 130, 246)',
                }}
                transitionDuration={200}
              />
            </div>

            {/* Right coordinates */}
            <div className="flex flex-col justify-between w-10 pl-2"> 
              {rows.map((row) => (
                <CoordinateLabel key={`right-${row}`} className={`h-[${squareSize}px] flex items-center`}>
                  {row}
                </CoordinateLabel>
              ))}
            </div>
          </div>

          {/* Bottom coordinates */}
          <div className="flex mt-2"> 
            <div className="w-10"/> 
            {columns.map((col) => (
              <CoordinateLabel key={`bottom-${col}`} className="w-20 text-center">
                {col}
              </CoordinateLabel>
            ))}
            <div className="w-10"/> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessboardUI;

