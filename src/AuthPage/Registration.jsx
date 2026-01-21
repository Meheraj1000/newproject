import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { registerUserApi } from "../api/services/userApi";

const Registration = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [referedCode, setReferedCode] = useState("");
  const [selfCode, setSelfCode] = useState("");


  const navigate = useNavigate();

  const generateCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setSelfCode(randomCode);
  };

  // ✅ onSubmit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selfCode) {
      Swal.fire("Error", "অনুগ্রহ করে ক্যাপচা জেনারেট করুন", "error");
      return;
    }

    const userData = {
      mobile,
      password,
      referedCode,
      selfCode,
    };

    try {
      const res = await registerUserApi(userData);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "রেজিস্ট্রেশন সফল!",
          text: "আপনি সফলভাবে অ্যাকাউন্ট তৈরি করেছেন।",
        }).then(() => {
          navigate("/login");
        });
      }

    } catch (error) {
      console.error("Registration error:", error?.response, error?.response?.data?.errorSources[0]?.message);
      Swal.fire(
        "Error",
        error?.response?.data?.errorSources[0]?.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-5">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">
          রেজিস্ট্রেশন করুন
        </h1>

        {/* Inputs */}
        <input
          type="text"
          value={mobile}
          required
          onChange={(e) => setMobile(e.target.value)}
          placeholder="📱 মোবাইল নম্বর"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="🔒 পাসওয়ার্ড"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          value={referedCode}
          required
          onChange={(e) => setReferedCode(e.target.value)}
          placeholder="👤 আমন্ত্রণ কোড"
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {/* Captcha */}
        <div className="flex gap-3">
          <input
            type="text"
            value={selfCode}
            required
            onChange={(e) => setSelfCode(e.target.value)}
            readOnly
            placeholder="🔐 ক্যাপচা"
            className="flex-1 p-3 rounded border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="button"
            onClick={generateCode}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 rounded"
          >
            কোড পান
          </button>
        </div>

        {/* Buttons */}
        <button
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
      </form>
    </div>
  );
};

export default Registration;
