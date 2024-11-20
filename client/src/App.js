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
import GoogleAuth from './components/GoogleAuth';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
      <div className="bg-gray-800 shadow-xl rounded-3xl p-8 text-gray-200 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-white">Chess AI</h1>
        <div className="space-y-6">
          {user ? (
            <div className="text-center">
              <p className="mb-4 text-lg">Welcome, <span className="font-bold">{user.name}</span>!</p>
              <GoogleAuth />
            </div>
          ) : (
            <GoogleAuth />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
