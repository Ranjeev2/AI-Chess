import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoogleAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/status', { withCredentials: true });
        setIsLoggedIn(response.data.loggedIn);
      } catch (err) {
        console.error('Error checking login status:', err);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    window.location = 'http://localhost:5000/auth/google';
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
      setIsLoggedIn(false);
      window.location.href = 'http://localhost:3000';
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div className="flex flex-col space-y-4 items-center">
      {!isLoggedIn && (
        <button
          onClick={handleLogin}
          className="flex items-center gap-3 px-5 py-3 border border-gray-300 rounded-full text-gray-800 bg-white hover:bg-gray-100 hover:shadow-lg transition duration-150"
        >
          <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" />
          <span className="font-medium">Login with Google</span>
        </button>
      )}
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-full hover:from-purple-600 hover:to-indigo-500 hover:shadow-lg transition duration-150"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;
