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
    <div className="relative min-h-screen bg-dashboard flex items-center justify-center p-4 overflow-hidden">
      {/* Background elegant blobs */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob"></div>
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-blob animation-delay-4000"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-dark border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.35)] animate-fade-in-up">
        {/* FinDash Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text text-center mb-2 tracking-wide">
          FinDash
        </h1>
        <h2 className="text-sm sm:text-base text-gray-400 text-center mb-8">
          Welcome back to your dashboard
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-medium mb-1.5 text-gray-400 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
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
              <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium mb-1.5 text-gray-400 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1.5">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-3 mt-2 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50"
          >
            {loginMutation.isPending ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>

        {/* Register link */}
        <p className="mt-8 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer font-medium transition-colors"
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
