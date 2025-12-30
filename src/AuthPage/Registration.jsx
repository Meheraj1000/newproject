import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";

const Registration = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [refCode, setRefCode] = useState("");
  const [code, setCode] = useState("");

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // Generate random 6-digit code
  const generateCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(randomCode);
  };

  const handleRegister = () => {
    if (!phone || !password || !refCode || !code) {
      return Swal.fire({
        icon: "error",
        title: "সমস্যা!",
        text: "সব ঘর পূরণ করুন।",
      });
    }

    // ---- LocalStorage Users ----
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if phone exists already
    const exists = storedUsers.find((u) => u.phone === phone);
    if (exists) {
      return Swal.fire({
        icon: "error",
        title: "সমস্যা!",
        text: "এই মোবাইল নাম্বারটি আগে ব্যবহার হয়েছে!",
      });
    }

    // Create new user
    const newUser = {
      phone,
      password,
      id: Date.now().toString().slice(-6),
      balance: 0,
      promoIncome: 0,
      farmIncome: 0,
      refCode,
    };

    // Save user
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    Swal.fire({
      icon: "success",
      title: "রেজিস্ট্রেশন সফল!",
      text: "আপনি সফলভাবে অ্যাকাউন্ট তৈরি করেছেন।",
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">

      {/* Top Banner */}
      <div className="w-full h-48">
        <img
          src="https://i.ibb.co/YWCVxT2/agricare-banner1.jpg"
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
        <div className="flex items-center bg-white p-3 rounded-md shadow mb-3">
          <span className="text-gray-500 mr-2">🔒</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="পাসওয়ার্ড"
            className="w-full outline-none"
          />
        </div>

        {/* Referral code */}
        <div className="flex items-center bg-white p-3 rounded-md shadow mb-3">
          <span className="text-gray-500 mr-2">👤</span>
          <input
            type="text"
            value={refCode}
            onChange={(e) => setRefCode(e.target.value)}
            placeholder="আমন্ত্রণ কোড"
            className="w-full outline-none"
          />
        </div>

        {/* Captcha */}
        <div className="flex gap-4 mb-4">
          <div className="flex items-center bg-white p-3 rounded-md shadow w-full">
            <span className="text-gray-500 mr-2">🔐</span>
            <input
              type="text"
              value={code}
              placeholder="ক্যাপচা"
              readOnly
              className="w-full outline-none"
            />
          </div>

          <button
            onClick={generateCode}
            className="bg-gray-100 px-4 py-3 rounded-md shadow text-green-600"
          >
            কোড পান
          </button>
        </div>

        {/* Sign up Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-green-500 text-white py-3 rounded-md mt-3"
        >
          সাইন আপ
        </button>

        {/* Back to Login */}
        <Link
          to="/login"
          className="block w-full text-center border border-green-500 text-green-600 py-3 rounded-md mt-3"
        >
          লগইন এ ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default Registration;
