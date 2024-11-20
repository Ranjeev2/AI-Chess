// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import GoogleAuth from './components/GoogleAuth';
// // import './App.css';

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/current_user`, { withCredentials: true });
//         setUser(res.data);
//       } catch (err) {
//         console.error('Error fetching user:', err);
//         setUser(null);
//       }
//     };
//     fetchUser();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//           <div className="max-w-md mx-auto">
//             <div>
//               <h1 className="text-2xl font-semibold text-center">Chess AI</h1>
//             </div>
//             <div className="divide-y divide-gray-200">
//               <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                 {user ? (
//                   <div>
//                     <p className="text-center">Welcome, {user.name}!</p>
//                     <GoogleAuth />
//                   </div>
//                 ) : (
//                   <GoogleAuth />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary routing components
import Navbar from './components/Navbar/Navbar'; // Import Navbar component
import GoogleAuth from './components/OAuth/GoogleAuth';
import Home from './components/Home/home';
import Profile from './components/Profile/Profile'; // Import Profile component

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/current_user', { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-200 py-8 flex flex-col justify-center sm:py-0">
        {user ? (
          <>
            <Navbar user={user} onLogout={handleLogout} /> {/* Navbar only renders for authenticated users */}
            <Routes>
              <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
              <Route path="/profile" element={<Profile user={user} />} />
            </Routes>
          </>
        ) : (
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-semibold text-center">Chess AI</h1>
                <GoogleAuth />
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
