import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";
import { loginApi } from "../api/services/authApi";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // page reload বন্ধ করবে
    // setLoading(true);
    // setError("");

    try {
      const res = await loginApi({ mobile: phone, password });

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "সফলভাবে লগইন!",
          text: "আপনি সফলভাবে লগইন করেছেন।",
        }).then(() => {
          navigate("/");
        });
      }

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "সমস্যা!",
        text: err?.response?.data?.errorSources[0]?.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6 relative overflow-hidden">

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
          লগইন করুন
        </h1>

        {/* Phone Input */}
        <div className="relative z-0 w-full mb-5">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="📱 মোবাইল নম্বর"
            className="w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white p-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-300 rounded transition"
          />
        </div>

        {/* Password Input */}
        <div className="relative z-0 w-full mb-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="🔒 পাসওয়ার্ড"
            className="w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white p-3 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-300 rounded transition"
          />
        </div>

        {/* Forget Password */}
        <Link
          to="/forgot-password"
          className="block text-right text-sm text-teal-700 dark:text-teal-400 hover:underline mb-4"
        >
          পাসওয়ার্ড মনে নেই?
        </Link>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-blue-500 hover:to-teal-500 text-white py-3 rounded-xl font-semibold shadow-md transition duration-300"
        >
          সাইন ইন
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center text-gray-700 dark:text-gray-300 my-4">
          <span className="border-b border-gray-300 w-1/3"></span>
          <span className="mx-3">অথবা</span>
          <span className="border-b border-gray-300 w-1/3"></span>
        </div>

        {/* Sign Up Button */}
        <Link
          to="/registration"
          className="w-full border  border-teal-500 text-teal-700 dark:text-teal-400 px-4  py-2 rounded-xl text-center font-semibold hover:bg-teal-100 dark:hover:bg-gray-700 transition"
        >
          সাইন আপ
        </Link>
      </div>
    </div>
  );
};

export default Login;
