import React, { useContext } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/User.context";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { setCurrUser } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const registerMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(`${API_URL}/register`, formData, {
        withCredentials:true
      });
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setCurrUser(data); 
      toast.success("Account created successfully!", { position: "top-center" });
      navigate("/"); 
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed", { position: "top-center" });
    }
  });

  // handle form submit
  const onSubmit = (data) => {
    console.log(data);
    
    registerMutation.mutate(data);
  };

  return (
    <div className="relative min-h-screen bg-dashboard flex items-center justify-center p-4 overflow-hidden">
      {/* Background elegant blobs */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob"></div>
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-blob animation-delay-4000"></div>

      {/* Registration Card */}
      <div className="relative z-10 w-full max-w-md bg-dark border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_18px_40px_rgba(0,0,0,0.35)] animate-fade-in-up">
        {/* FinDash Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text text-center mb-2 tracking-wide">
          FinDash
        </h1>
        <h2 className="text-sm sm:text-base text-gray-400 text-center mb-8">
          Create your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium mb-1.5 text-gray-400 uppercase tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              {...register("username", { required: "Name is required" })}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
              placeholder="Your Name"
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-1.5">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium mb-1.5 text-gray-400 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
              placeholder="you@example.com"
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
              {...register("password", { required: "Password is required" })}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-300"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1.5">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 transition-all duration-300 disabled:opacity-50"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Login link */}
        <p className="mt-8 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer font-medium transition-colors"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
