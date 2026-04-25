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
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden flex items-center justify-center px-4">
      {/* Animated Blobs */}
      <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Registration Card */}
      <div className="z-10 bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-6 sm:p-8 max-w-sm sm:max-w-md w-full text-white">
        {/* FinDash Logo */}
        <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text animate-pulse text-center mb-4 sm:mb-6 tracking-widest">
          FinDash
        </h1>

        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
          <label className="block mb-1 text-sm sm:text-base">Name</label>
          <input
            type="text"
            {...register("username", { required: "Name is required" })}
            className="w-full px-3 sm:px-4 py-2 mb-1 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-400 text-xs sm:text-sm mb-2">{errors.name.message}</p>}

          <label className="block mb-1 text-sm sm:text-base">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-3 sm:px-4 py-2 mb-1 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-400 text-xs sm:text-sm mb-2">{errors.email.message}</p>}

          <label className="block mb-1 text-sm sm:text-base">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-3 sm:px-4 py-2 mb-1 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="********"
          />
          {errors.password && <p className="text-red-400 text-xs sm:text-sm mb-2">{errors.password.message}</p>}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold transition duration-300 text-sm sm:text-base mt-3 sm:mt-4"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-center hover:cursor-pointer">
          Already have an account?{" "}
          <span onClick={() => navigate('/login')} className="text-purple-400 hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
