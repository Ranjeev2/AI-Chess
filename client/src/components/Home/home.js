import React from 'react';
import Navbar from '../Navbar/Navbar';

const Home = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-gray-200">
      <Navbar user={user} onLogout={onLogout} />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">Welcome to Chess AI</h1>
          <p className="text-lg">
            Hello, <span className="font-semibold">{user.name}</span>! Ready to improve your chess skills and take on the AI?
          </p>
          <div className="mt-8">
            <button
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-full hover:from-purple-600 hover:to-indigo-500 hover:shadow-lg transition duration-150"
            >
              Play Game
            </button>
            <button
              className="ml-4 px-6 py-3 bg-gray-800 border border-gray-600 text-white font-medium rounded-full hover:bg-gray-700 hover:shadow-lg transition duration-150"
            >
              Learn Strategies
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Top Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">AI-Powered Chess</h3>
              <p>Play against an AI designed to challenge and help you improve.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Learn Strategies</h3>
              <p>Access tutorials and practice famous chess strategies.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p>Analyze your games and monitor your improvement over time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
