"use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import api from "@/services/api"; // Custom API instance
// import { useDispatch } from "react-redux";
// import { setAuthState } from "@/redux/slices/authSlice";
// import { getRoleFromToken } from "@/utils/token"; // Import utility function

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleLogin = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       // Send login request
//       const { data } = await api.post("/auth/login", { email, password });

//       // Extract role using utility function
//       const role = getRoleFromToken(data.accessToken);
//       if (!role) {
//         throw new Error("Failed to retrieve role from token.");
//       }
// console.log('Access Token in Local Storage:', localStorage.getItem('accessToken'));

//       // Save the token to local storage
//       localStorage.setItem("accessToken", data.accessToken);

//       // Update global state with Redux
//       dispatch(
//         setAuthState({
//           accessToken: data.accessToken,
//           role,
//           user: data.user,
//         })
//       );
//  console.log(role)
//       // Redirect based on role
//       if (role === "admin") {
//         router.push("/admin/dashboard");
//       } else if (role === "user") {
//         router.push("/user/dashboard");
//       } else {
//         throw new Error("Invalid role. Contact support.");
//       }
//     } catch (err) {
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data?.message || "An error occurred during login.");
//       } else {
//         setError("An unexpected error occurred. Please try again later.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Login</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="block border p-2 mb-4 w-full rounded"
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="block border p-2 mb-4 w-full rounded"
//       />
//       <button
//         onClick={handleLogin}
//         disabled={isLoading}
//         className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//       >
//         {isLoading ? "Logging in..." : "Login"}
//       </button>
//     </div>
//   );
// };

// export default LoginForm;
// import React, { useState } from 'react';

// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';
// import { setAccessToken } from '@/redux/slices/authSlice';
// import { useLoginMutation } from '../services/authRTKApi';

// const isDevelopment = process.env.NODE_ENV === 'development';
// const LoginForm: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [login, { isLoading }] = useLoginMutation();
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const response = await login({ email, password }).unwrap();
//       dispatch(setAccessToken(response.accessToken));
//       router.push('/user/dashboard');
//     } catch (error) {
//     if (isDevelopment) console.error('Login Failed:', error);
//     setError('Error during password reset request');
//   }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Enter your email"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Enter your password"
//           />
//         </div>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full py-2 px-4 text-white font-semibold rounded-md focus:outline-none ${
//             isLoading
//               ? 'bg-blue-400 cursor-not-allowed'
//               : 'bg-blue-500 hover:bg-blue-600'
//           }`}
//         >
//           {isLoading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
