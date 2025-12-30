import React, { useState } from "react";
import { Link } from "react-router-dom";

const Withdraw = () => {
  const [form, setForm] = useState({
    name: "",
    bank: "",
    account: "",
    mobile: "",
  });

  // simple captcha code
  const [captcha, setCaptcha] = useState(Math.random().toString(36).substring(2, 8));

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.bank || !form.account || !form.mobile) {
      alert("সব ঘর পূরণ করুন!");
      return;
    }

    alert("Withdraw Request Submitted Successfully!");
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-lg mb-10 shadow-md">
      <h2 className="text-center text-2xl sm:text-3xl font-bold bg-green-500 text-white py-2 rounded">
        অ্যাকাউন্ট তথ্য
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">

        {/* Name */}
        <div>
          <label className="font-semibold text-sm sm:text-base">নাম</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 sm:p-3 rounded bg-gray-100 text-sm sm:text-base"
            placeholder="আপনার নাম"
          />
        </div>

        {/* Bank Name */}
        <div>
          <label className="font-semibold text-sm sm:text-base">ব্যাংকের নাম</label>
          <input
            type="text"
            name="bank"
            value={form.bank}
            onChange={handleChange}
            className="w-full border p-2 sm:p-3 rounded bg-gray-100 text-sm sm:text-base"
            placeholder="bkash / nagad / rocket"
          />
        </div>

        {/* Account Number */}
        <div>
          <label className="font-semibold text-sm sm:text-base">অ্যাকাউন্ট নম্বর</label>
          <input
            type="text"
            name="account"
            value={form.account}
            onChange={handleChange}
            className="w-full border p-2 sm:p-3 rounded bg-gray-100 text-sm sm:text-base"
            placeholder="01XXXXXXXXX"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="font-semibold text-sm sm:text-base">মোবাইল</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className="w-full border p-2 sm:p-3 rounded bg-gray-100 text-sm sm:text-base"
            placeholder="+8801XXXXXXXX"
          />
        </div>

        {/* Captcha */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center bg-gray-100 p-3 rounded w-full sm:w-auto">
            <span className="text-gray-600 font-bold mr-2">{captcha}</span>
            <button
              type="button"
              onClick={() => setCaptcha(Math.random().toString(36).substring(2, 8))}
              className="text-sm text-blue-600 hover:underline"
            >
              Refresh
            </button>
          </div>
          <input
            type="text"
            placeholder="ক্যাপচা লিখুন"
            className="w-full sm:flex-1 border p-2 sm:p-3 rounded bg-gray-100 text-sm sm:text-base"
          />
        </div>

        {/* Submit Button */}
        <Link
          to="/WithdrawPanding"
          className="w-full sm:w-auto block text-center bg-green-500 text-white py-3 sm:py-4 text-lg sm:text-xl rounded font-bold hover:bg-green-600 transition-colors"
        >
          সংরক্ষণ করুন
        </Link>
      </form>
    </div>
  );
};

export default Withdraw;
