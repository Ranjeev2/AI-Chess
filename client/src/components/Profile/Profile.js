import React from 'react';
import defaultAvatar from '../Assets/avatar.png'; // Import default avatar

const Profile = ({ user }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center w-96">
        <img
          src={user.avatar ? user.avatar : defaultAvatar} // Use user avatar or default
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-400">Email: {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
