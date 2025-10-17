// // import React, { useState } from "react";
// // import API from "../../api";
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);
// //     try {
// //       const res = await API.post("/auth/login", form);
// //       localStorage.setItem("token", res.data.token);
// //       alert("Login Successful!");
// //       navigate("/home");
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Login failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm"
// //       >
// //         <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
// //         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
// //         <input
// //           name="email"
// //           type="email"
// //           placeholder="Email"
// //           value={form.email}
// //           onChange={handleChange}
// //           className="w-full p-2 border rounded-lg mb-3 focus:ring focus:ring-indigo-200"
// //         />
// //         <input
// //           name="password"
// //           type="password"
// //           placeholder="Password"
// //           value={form.password}
// //           onChange={handleChange}
// //           className="w-full p-2 border rounded-lg mb-4 focus:ring focus:ring-indigo-200"
// //         />
// //         <button
// //           type="submit"
// //           disabled={loading}
// //           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg"
// //         >
// //           {loading ? "Logging in..." : "Login"}
// //         </button>
// //         <p className="text-center text-sm mt-4">
// //           Don’t have an account?{" "}
// //           <span
// //             className="text-indigo-600 hover:underline cursor-pointer"
// //             onClick={() => navigate("/signup")}
// //           >
// //             Sign up
// //           </span>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;
// import React, { useState } from 'react';
// import API from '../../api/api';
// import { setToken } from '../../utils/auth';
// import { useNavigate } from 'react-router-dom';


// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post('/auth/login', { email, password });
//       setToken(res.data.token);

//       // redirect based on role
//       const role = res.data.user.role;
//       if (role === 'hospital') navigate('/hospital');
//       else if (role === 'doctor') navigate('/doctor');
//       else navigate('/patient');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
import React, { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });

      // Save token in localStorage
      localStorage.setItem('token', res.data.token);

      // Save user role if needed
      const userRole = res.data.user.role;
      localStorage.setItem('role', userRole);

      // Redirect based on role
      if (userRole === 'doctor') navigate('/doctor');
      else if (userRole === 'patient') navigate('/patient');
      else if (userRole === 'hospital') navigate('/hospital');

    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
