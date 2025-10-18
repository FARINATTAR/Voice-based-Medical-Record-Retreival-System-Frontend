// // // import React from "react";
// // // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // // import Signup from "./components/Auth/Signup.jsx";
// // // import Login from "./components/Auth/Login.jsx";
// // // import Home from "./pages/Home.jsx";

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <Routes>
// // //         <Route path="/" element={<Signup />} />
// // //         <Route path="/signup" element={<Signup />} />
// // //         <Route path="/login" element={<Login />} />
// // //         <Route path="/home" element={<Home />} />
// // //       </Routes>
// // //     </Router>
// // //   );
// // // }

// // // export default App;
// // import React from 'react';
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import Login from './components/Auth/Login';
// // import Signup from './components/Auth/Signup';
// // import HospitalDashboard from './components/dashboard/HospitalDashboard';
// // import DoctorDashboard from './components/dashboard/DoctorDashboard';
// // import PatientDashboard from './components/dashboard/PatientDashboard';
// // import Dashboard from './pages/Dashboard';

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<Login />} />
// //         <Route path="/signup" element={<Signup />} />
// //         <Route path="/hospital" element={<HospitalDashboard />} />
// //         <Route path="/doctor" element={<DoctorDashboard />} />
// //         <Route path="/patient" element={<PatientDashboard />} />
// //         <Route path="/dashboard" element={<Dashboard />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import DoctorDashboard from './pages/DoctorDashboard';

// function PrivateRoute({ children }) {
//   const token = localStorage.getItem('token');
//   return token ? children : <Navigate to="/login" />;
// }

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/dashboard" element={<PrivateRoute><DoctorDashboard /></PrivateRoute>} />
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// }
// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import DoctorDashboard from './components/dashboard/DoctorDashboard';
import HospitalDashboard from './components/dashboard/HospitalDashboard';
import PatientDashboard from './components/dashboard/PatientDashboard';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token'); // check login token
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DoctorDashboard />
            </PrivateRoute>
          }
        />

        {/* Add hospital/patient dashboards here in future */}
        <Route path="/hospital" element={<PrivateRoute><HospitalDashboard /></PrivateRoute>} />
        <Route path="/patient" element={<PrivateRoute><PatientDashboard /></PrivateRoute>} />

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
