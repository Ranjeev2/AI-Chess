// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import GoogleAuth from './components/GoogleAuth';
// // // import './App.css';

// // function App() {
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       try {
// //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/current_user`, { withCredentials: true });
// //         setUser(res.data);
// //       } catch (err) {
// //         console.error('Error fetching user:', err);
// //         setUser(null);
// //       }
// //     };
// //     fetchUser();
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
// //       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
// //         <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
// //         <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
// //           <div className="max-w-md mx-auto">
// //             <div>
// //               <h1 className="text-2xl font-semibold text-center">Chess AI</h1>
// //             </div>
// //             <div className="divide-y divide-gray-200">
// //               <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
// //                 {user ? (
// //                   <div>
// //                     <p className="text-center">Welcome, {user.name}!</p>
// //                     <GoogleAuth />
// //                   </div>
// //                 ) : (
// //                   <GoogleAuth />
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import GoogleAuth from './components/OAuth/GoogleAuth';
// import Home from './components/Home/home';
// import Profile from './components/Profile/Profile';
// import ChessGame from './components/ChessAI/ChessGame'; // Add this import

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/current_user', { withCredentials: true });
//         setUser(res.data);
//       } catch (err) {
//         console.error('Error fetching user:', err);
//         setUser(null);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
//       setUser(null);
//     } catch (err) {
//       console.error('Error logging out:', err);
//     }
//   };

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-200 py-8 flex flex-col justify-center sm:py-0">
//         {user ? (
//           <>
//             <Navbar user={user} onLogout={handleLogout} />
//             <Routes>
//               <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
//               <Route path="/profile" element={<Profile user={user} />} />
//               <Route path="/play" element={<ChessGame user={user} />} /> {/* Add this route */}
//             </Routes>
//           </>
//         ) : (
//           <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//             <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//               <div className="max-w-md mx-auto">
//                 <h1 className="text-2xl font-semibold text-center">Chess AI</h1>
//                 <GoogleAuth />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Router>
//   );
// }

// export default App;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import GoogleAuth from './components/OAuth/GoogleAuth';
// import Home from './components/Home/home';
// import Profile from './components/Profile/Profile';
// import ChessGame from './components/ChessAI/ChessGame';
// import DailyChallenge from './components/ChessAI/DailyChallenge';

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/current_user', { withCredentials: true });
//         setUser(res.data);
//       } catch (err) {
//         console.error('Error fetching user:', err);
//         setUser(null);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
//       setUser(null);
//     } catch (err) {
//       console.error('Error logging out:', err);
//     }
//   };

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-200 py-8 flex flex-col justify-center sm:py-0">
//         {user ? (
//           <>
//             <Navbar user={user} onLogout={handleLogout} />
//             <Routes>
//               <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
//               <Route path="/profile" element={<Profile user={user} />} />
//               <Route path="/play" element={<ChessGame user={user} />} />
//               <Route path="*" element={<Navigate to="/home" replace />} />
//               <Route path="/daily-challenge" element={<DailyChallenge />} />

//             </Routes>
//           </>
//         ) : (
//           <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//             <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//               <div className="max-w-md mx-auto">
//                 <h1 className="text-2xl font-semibold text-center">Chess AI</h1>
//                 <GoogleAuth />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Router>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Navbar from './components/Navbar/Navbar';
// import Footer from './components/Footer/Footer';
// import GoogleAuth from './components/OAuth/GoogleAuth';
// import Home from './components/Home/home';
// import Profile from './components/Profile/Profile';
// import ChessGame from './components/ChessAI/ChessGame';
// import DailyChallenge from './components/ChessAI/DailyChallenge';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/current_user', { withCredentials: true });
//         setUser(res.data);
//       } catch (err) {
//         console.error('Error fetching user:', err);
//         setUser(null);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
//       setUser(null);
//     } catch (err) {
//       console.error('Error logging out:', err);
//     }
//   };

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <CssBaseline />
//       <Router>
//         <div className="flex flex-col min-h-screen bg-gray-900">
//           {user ? (
//             <>
//               <Navbar user={user} onLogout={handleLogout} />
//               <main className="flex-grow">
//                 <Routes>
//                   <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
//                   <Route path="/profile" element={<Profile user={user} />} />
//                   <Route path="/play" element={<ChessGame user={user} />} />
//                   <Route path="/daily-challenge" element={<DailyChallenge />} />
//                   <Route path="*" element={<Navigate to="/" replace />} />
//                 </Routes>
//               </main>
//               <Footer />
//             </>
//           ) : (
//             <div className="flex items-center justify-center flex-grow">
//               <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//                 <div className="relative px-4 py-10 bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
//                   <div className="max-w-md mx-auto">
//                     <h1 className="text-3xl font-bold text-center text-white mb-8">Chess AI</h1>
//                     <GoogleAuth />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import GoogleAuth from './components/OAuth/GoogleAuth';
import Home from './components/Home/home';
import Profile from './components/Profile/Profile';
import ChessGame from './components/ChessAI/ChessGame';
// import DailyChallenge from './components/ChessAI/DailyChallenge';
import NewsletterPage from './components/Newsletter/Newsletter';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-900">
          {user ? (
            <>
              <Navbar user={user} onLogout={handleLogout} />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
                  <Route path="/profile" element={<Profile user={user} />} />
                  <Route path="/play" element={<ChessGame user={user} />} />
                  {/* <Route path="/daily-challenge" element={<DailyChallenge />} /> */}
                  <Route path="/newsletter" element={<NewsletterPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </>
          ) : (
            <div className="flex items-center justify-center flex-grow">
              <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
                  <div className="max-w-md mx-auto">
                    <h1 className="text-3xl font-bold text-center text-white mb-8">Chess AI</h1>
                    <GoogleAuth />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

