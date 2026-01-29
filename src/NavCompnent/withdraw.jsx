import React, { useState } from "react";
import { createWithdrawApi } from "../api/services/withdraw";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const Withdraw = () => {
  // const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    paymentType: "",
    paymentNumber: "",
    amount: 0,
  });

  // const [captcha, setCaptcha] = useState(
  //   Math.random().toString(36).substring(2, 8)
  // );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const withdrawData = {
      ...form,
      amount: Number(form.amount),
    }
    try {
      await createWithdrawApi(withdrawData);
      // navigate("/WithdrawPanding");
      Swal.fire({
        icon: "success",
        title: "সফলভাবে রিকোয়েস্ট!",
        text: "টাকা উত্তোলনের জন্য রিকোয়েস্ট সফল হয়েছে।",
      })
      setForm({
        name: "",
        paymentType: "",
        paymentNumber: "",
        amount: 0,
      })

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "সমস্যা!",
        text: error?.response?.data?.errorSources?.[0]?.message || "সমস্যা হয়েছে।",
      });
    }


  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      {/* Header */}
      <h2 className="text-center text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-2 rounded">
        অ্যাকাউন্ট তথ্য
      </h2>

      {/* Balance Info */}
      <div className="bg-indigo-50 p-4 mt-4 rounded">
        <p className="font-bold text-indigo-700">বর্তমান ব্যালেন্স</p>
        <p className="text-2xl text-indigo-900 font-semibold">
          Tk {user?.balance}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Name */}
        <input
          required
          type="text"
          name="name"
          placeholder="আপনার অ্যাকাউন্ট নাম"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Bank */}
        <input
          required
          type="text"
          name="paymentType"
          placeholder="বিকাশ / নগদ / রকেট"
          value={form.paymentType}
          onChange={handleChange}
          className="w-full border p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* amount */}
        <input
          required
          type="text"
          name="amount"
          placeholder="উত্তোলনের পরিমাণ"
          value={form.amount}
          onChange={handleChange}
          className="w-full border p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* Hint Text */}
        {/* <p className="text-sm text-gray-500 mt-0 text-start">
          সর্বনিম্ন উত্তোলনের পরিমাণ ৫০০ টাকা
        </p> */}

        {/* Mobile */}
        <input
          required
          type="text"
          name="paymentNumber"
          placeholder="বিকাশ / নগদ / রকেট নাম্বার"
          value={form.paymentNumber}
          onChange={handleChange}
          className="w-full border p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Captcha */}
        {/* <div className="flex gap-3 items-center">
          <span className="font-bold text-lg">{captcha}</span>
          <button
            type="button"
            onClick={() =>
              setCaptcha(Math.random().toString(36).substring(2, 8))
            }
            className="text-indigo-600 font-semibold hover:underline"
          >
            Refresh
          </button>
        </div> */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-3 rounded text-xl font-bold hover:from-purple-500 hover:to-indigo-600 transition duration-300"
        >
          সংরক্ষণ করুন
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
