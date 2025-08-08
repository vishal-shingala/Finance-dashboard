import React from "react";
import "../index.css"; // Make sure custom animations like animate-blob and animation-delay exist
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden flex items-center justify-center px-4">
      {/* Background animation blobs */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Login Card */}
      <div className="z-10 bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-8 max-w-md w-full text-white">
        {/* FinDash Animated Title */}
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text animate-pulse text-center mb-6 tracking-widest">
          FinDash
        </h1>

        <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back</h2>

        <form>
          <label className="block mb-2 text-sm">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 mb-4 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="you@example.com"
          />

          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 mb-6 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="********"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <span onClick={()=> navigate('/register')} className="text-purple-400 hover:underline hover:cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
