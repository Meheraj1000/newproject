import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!phone || !password) {
      return Swal.fire({
        icon: "error",
        title: "সমস্যা!",
        text: "মোবাইল নম্বর এবং পাসওয়ার্ড পূরণ করুন।",
      });
    }

    const result = login(phone, password); // AuthProvider login()

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "সফলভাবে লগইন!",
        text: "আপনি সফলভাবে লগইন করেছেন।",
      }).then(() => {
        navigate("/"); // লগইন হলে হোমে রিডাইরেক্ট
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "সমস্যা!",
        text: result.message,
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Top Banner */}
      <div className="w-full h-48">
        <img
          src="https://i.ibb.co/7rPXtpr/agricare-banner2.jpg"
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto mt-6 p-4">

        {/* Phone */}
        <div className="flex items-center bg-white p-3 rounded-md shadow mb-3">
          <span className="text-gray-500 mr-2">📱</span>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+880 মোবাইল"
            className="w-full outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-white p-3 rounded-md shadow mb-2">
          <span className="text-gray-500 mr-2">🔒</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="পাসওয়ার্ড"
            className="w-full outline-none"
          />
        </div>

        {/* Forget Password */}
        <Link
          to="/forgot-password"
          className="text-right text-sm text-gray-600 mb-3 block"
        >
          পাসওয়ার্ড মনে নেই?
        </Link>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-3 rounded-md"
        >
          সাইন ইন
        </button>

        {/* Sign Up Button */}
        <Link
          to="/registration"
          className="w-full border border-green-500 text-green-600 py-3 rounded-md mt-3 block text-center"
        >
          সাইন আপ
        </Link>
      </div>
    </div>
  );
};

export default Login;
