import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthPage/AuthProvider";

const WithdrawPanding = () => {
  const { user } = useContext(AuthContext);

  const [amount, setAmount] = useState("");
  const [withdrawInfo, setWithdrawInfo] = useState(null);

  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem("withdrawDraft"));
    if (draft) setWithdrawInfo(draft);
  }, []);

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-500">
        অনুগ্রহ করে লগইন করুন
      </div>
    );
  }

  const handleWithdraw = () => {
    if (!amount || Number(amount) <= 0) {
      alert("সঠিক উত্তোলনের পরিমাণ লিখুন!");
      return;
    }

    if (Number(amount) > Number(user.balance)) {
      alert("পর্যাপ্ত ব্যালেন্স নেই!");
      return;
    }

    if (!withdrawInfo) {
      alert("প্রথমে ব্যাংক তথ্য যোগ করুন!");
      return;
    }

    const allWithdraws =
      JSON.parse(localStorage.getItem("allWithdraws")) || [];

    const newWithdraw = {
      id: Date.now(),
      userPhone: user.phone,
      amount: Number(amount),
      bankInfo: withdrawInfo,
      status: "pending",
      date: new Date().toLocaleString(),
    };

    allWithdraws.push(newWithdraw);
    localStorage.setItem("allWithdraws", JSON.stringify(allWithdraws));

    alert("Withdraw request সফলভাবে পাঠানো হয়েছে");
    setAmount("");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      {/* Header */}
      <h2 className="text-center text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-2 rounded">
        টাকা তোলা
      </h2>

      {/* Balance Info */}
      <div className="bg-indigo-50 p-4 mt-4 rounded">
        <p className="font-bold text-indigo-700">বর্তমান ব্যালেন্স</p>
        <p className="text-2xl text-indigo-900 font-semibold">Tk {user.balance}</p>
      </div>

      {/* Withdraw Info */}
      {withdrawInfo && (
        <div className="bg-gray-100 p-3 rounded mt-4 text-sm">
          <p>নাম: {withdrawInfo.name}</p>
          <p>ব্যাংক: {withdrawInfo.bank}</p>
          <p>অ্যাকাউন্ট: {withdrawInfo.account}</p>
          <p>মোবাইল: {withdrawInfo.mobile}</p>
        </div>
      )}

      {/* Withdraw Amount Input */}
      <input
        type="number"
        placeholder="উত্তোলনের পরিমাণ"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-3 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Submit Button */}
      <button
        onClick={handleWithdraw}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-3 rounded mt-4 text-xl font-bold hover:from-purple-500 hover:to-indigo-600 transition duration-300"
      >
        এখনই প্রত্যাহার করুন
      </button>
    </div>
  );
};

export default WithdrawPanding;
