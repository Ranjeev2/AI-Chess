import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

const DailyChallenge = () => {
  const [game, setGame] = useState(new Chess());
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  useEffect(() => {
    const fetchInitialPosition = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/challenges/today",
          { withCredentials: true }
        );
        const challengeData = response.data;

        setGame(new Chess(challengeData.initialPosition));
        setMessage("Challenge started! Make your first move.");
      } catch (error) {
        console.error("Error fetching initial position:", error);
        setMessage("Error loading challenge. Please try again later.");
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
        const response = await axios.post(
          "http://localhost:5000/api/challenges/ai-move",
          {
            fen: newGame.fen(),
          },
          { withCredentials: true }
        );

        const { aiMove, isGameOver, isUserWin } = response.data;
        newGame.move(aiMove);
        setGame(new Chess(newGame.fen()));

        if (isGameOver) {
          setResult(isUserWin ? "userWin" : "aiWin");
          setMessage(
            isUserWin
              ? "Congratulations! You won the challenge!"
              : "AI wins! Better luck next time."
          );
          if (isUserWin) setChallengeCompleted(true);
        }
      } catch (error) {
        console.error("Error getting AI move:", error);
        setMessage("Error getting AI move. Please try again.");
      }
    } else {
      setMessage("Invalid move. Please try again.");
    }
  };

  
  function onDrop(sourceSquare, targetSquare) {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    };

    makeMove(move);
    return true;
  }

  if (loading) {
    return <div className="text-center mt-8">Loading challenge...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Daily Chess Challenge</h2>
          <p className="text-gray-600 mb-4">
            Play against the AI and try to win!
          </p>
        </div>

        <div className="max-w-[600px] mx-auto">
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            boardWidth={600}
          />
        </div>

        {message && (
          <div
            className={`mt-4 p-4 rounded-lg text-center ${
              result === "userWin"
                ? "bg-green-100 text-green-800"
                : result === "aiWin"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {result === "userWin" && <CheckCircle2 className="w-5 h-5" />}
              {result === "aiWin" && <XCircle className="w-5 h-5" />}
              {!result && <AlertCircle className="w-5 h-5" />}
              <span>{message}</span>
            </div>
          </div>
        )}

        {challengeCompleted && (
          <div className="mt-6 text-center">
            <div className="bg-green-100 text-green-800 p-4 rounded-lg">
              <CheckCircle2 className="w-6 h-6 inline-block mr-2" />
              You successfully completed the challenge!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyChallenge;
