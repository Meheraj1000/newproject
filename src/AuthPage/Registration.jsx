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

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const exists = storedUsers.find((u) => u.phone === phone);
    if (exists) {
      return Swal.fire({
        icon: "error",
        title: "সমস্যা!",
        text: "এই মোবাইল নাম্বারটি আগে ব্যবহার হয়েছে!",
      });
    }

    const newUser = {
      phone,
      password,
      id: Date.now().toString().slice(-6),
      balance: 0,
      promoIncome: 0,
      farmIncome: 0,
      refCode,
    };

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-5">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
          রেজিস্ট্রেশন করুন
        </h1>

        {/* Inputs */}
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="📱 মোবাইল নম্বর"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="🔒 পাসওয়ার্ড"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          value={refCode}
          onChange={(e) => setRefCode(e.target.value)}
          placeholder="👤 আমন্ত্রণ কোড"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {/* Captcha */}
        <div className="flex gap-3">
          <input
            type="text"
            value={code}
            readOnly
            placeholder="🔐 ক্যাপচা"
            className="flex-1 p-3 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={generateCode}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 rounded"
          >
            কোড পান
          </button>
        </div>

        {/* Buttons */}
        <button
          onClick={handleRegister}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded font-semibold"
        >
          সাইন আপ
        </button>
        <Link
          to="/login"
          className="w-full text-center block border border-teal-500 text-teal-700 dark:text-teal-400 py-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          লগইন এ ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default Registration;
