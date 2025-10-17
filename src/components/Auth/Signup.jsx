// // import React, { useState } from "react";
// // import API from "../../api";
// // import { useNavigate } from "react-router-dom";

// // const Signup = () => {
// //   const navigate = useNavigate();
// //   const [form, setForm] = useState({ name: "", email: "", password: "" });
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");
// //     setLoading(true);
// //     try {
// //       const res = await API.post("/auth/signup", form);
// //       localStorage.setItem("token", res.data.token);
// //       alert("Signup Successful!");
// //       navigate("/login");
// //     } catch (err) {
// //       setError(err.response?.data?.message || "Signup failed");
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
// //         <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>
// //         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
// //         <input
// //           name="name"
// //           placeholder="Full Name"
// //           value={form.name}
// //           onChange={handleChange}
// //           className="w-full p-2 border rounded-lg mb-3 focus:ring focus:ring-indigo-200"
// //         />
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
// //           {loading ? "Creating..." : "Sign Up"}
// //         </button>
// //         <p className="text-center text-sm mt-4">
// //           Already have an account?{" "}
// //           <span
// //             className="text-indigo-600 hover:underline cursor-pointer"
// //             onClick={() => navigate("/login")}
// //           >
// //             Log in
// //           </span>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Signup;
// import React, { useState } from 'react';
// import API from '../../api/api';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('patient');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post('/auth/signup', { name, email, password, role });
//       alert('Signup successful!');
//       navigate('/');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
//       <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
//       <select value={role} onChange={e => setRole(e.target.value)}>
//         <option value="hospital">Hospital</option>
//         <option value="doctor">Doctor</option>
//         <option value="patient">Patient</option>
//       </select>
//       <button type="submit">Signup</button>
//     </form>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", { name, email, password, role });
      console.log(res.data);
      alert("Signup successful! Now login.");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="hospital">Hospital</option>
        <option value="doctor">Doctor</option>
        <option value="patient">Patient</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
