import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ChessGame from '../ChessAI/ChessGame';
import { Bell, BellOff, ChevronRight, Brain, TrendingUp, Award } from 'lucide-react';

const Home = ({ user, onLogout }) => {
  const [showChessGame, setShowChessGame] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(user.isSubscribed);
  const [email, setEmail] = useState(user.email || '');

  const handlePlayGame = () => {
    setShowChessGame(true);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/subscription/subscribe', { email }, { withCredentials: true });
      setIsSubscribed(response.data.isSubscribed);
      alert(response.data.message);
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('An error occurred while subscribing. Please try again.');
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/subscription/unsubscribe', {}, { withCredentials: true });
      setIsSubscribed(response.data.isSubscribed);
      alert(response.data.message);
    } catch (error) {
      console.error('Error unsubscribing:', error);
      alert('An error occurred while unsubscribing. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showChessGame ? (
          <>
            <div className="text-center space-y-8">
              <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Welcome to Chess AI
              </h1>
              <p className="text-xl">
                Hello, <span className="font-semibold">{user.name}</span>! Ready to elevate your chess game?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handlePlayGame}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-full hover:from-purple-600 hover:to-indigo-700 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Play Game
                </button>
                <a
                  href="https://www.youtube.com/playlist?list=PLQKBpQZcRycrvUUxLdVmlfMChJS0S5Zw0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                  Learn Strategies
                </a>
              </div>
            </div>

            <div className="mt-16">
              <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
                <div className="px-6 py-8">
                  <h2 className="text-3xl font-bold text-center mb-6">Daily Chess Challenges</h2>
                  <p className="text-center mb-8">
                    Subscribe to receive daily chess puzzles and improve your skills!
                  </p>
                  {isSubscribed ? (
                    <div className="text-center">
                      <p className="text-green-400 mb-4">You're subscribed to daily challenges!</p>
                      <button
                        onClick={handleUnsubscribe}
                        className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        <BellOff className="mr-2" size={20} />
                        Unsubscribe
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex flex-col items-center space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="px-4 py-2 rounded-full text-gray-900 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-full hover:from-green-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        <Bell className="mr-2" size={20} />
                        Subscribe to Daily Challenges
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/daily-challenge"
                className="inline-block px-6 py-3 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition duration-300"
              >
                Play Today's Challenge
              </Link>
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center mb-10">Top Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Brain className="w-12 h-12 text-purple-400" />}
                  title="AI-Powered Chess"
                  description="Challenge yourself against our advanced AI, designed to adapt and help you improve."
                />
                 <a 
                  href="https://www.youtube.com/playlist?list=PLQKBpQZcRycrvUUxLdVmlfMChJS0S5Zw0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <FeatureCard
                    icon={<ChevronRight className="w-12 h-12 text-blue-400" />}
                    title="Learn Strategies"
                    description="Access a wealth of tutorials and practice famous chess strategies to enhance your game."
                  />
                </a>
               <Link to="/profile" className="block">
                  <FeatureCard
                    icon={<TrendingUp className="w-12 h-12 text-green-400" />}
                    title="Track Progress"
                    description="Analyze your games, track your improvement, and watch your chess rating soar over time."
                  />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <ChessGame 
            onBack={() => setShowChessGame(false)} 
            user={user} 
          />
        )}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-2">
    <div className="flex flex-col items-center text-center">
      {icon}
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  </div>
);

export default Home;

