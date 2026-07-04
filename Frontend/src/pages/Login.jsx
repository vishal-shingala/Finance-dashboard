import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../config";
import toast from 'react-hot-toast';
import { UserContext } from "../context/User.context";



const Login = () => {
  const navigate = useNavigate();
  const {setCurrUser} = useContext(UserContext);

  
  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${API_URL}/login`, data, {
        withCredentials: true
      });
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      setCurrUser(data);
      toast.success("Login Successfully", { position: "top-center" });
      navigate("/"); // example navigation
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("Failed to Login", { position: "top-center" });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden flex items-center justify-center px-4">
      {/* Background animation blobs */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Login Card */}
      <div className="z-10 bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-white">
        {/* FinDash Animated Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text animate-pulse text-center mb-4 sm:mb-6 tracking-widest">
          FinDash
        </h1>

        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6">
          Welcome Back
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-4"
        >
          {/* Email */}
          <label className="block mb-2 text-sm">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 mb-1 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="you@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mb-3">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className="block mb-2 text-sm">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 mb-1 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="********"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-400 text-xs mb-3">
              {errors.password.message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-purple-400 hover:underline hover:cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
