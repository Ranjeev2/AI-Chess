import React from 'react';
import axios from 'axios';

const GoogleAuth = () => {
  const handleLogin = () => {
    window.location = 'http://localhost:5000/auth/google';
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
      window.location.href = 'http://localhost:3000';
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <button
        onClick={handleLogin}
        className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      >
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        <span>Login with Google</span>
      </button>
      <button
        onClick={handleLogout}
        className="px-4 py-2 border flex justify-center gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      >
        Logout
      </button>
    </div>
  );
};

export default GoogleAuth;