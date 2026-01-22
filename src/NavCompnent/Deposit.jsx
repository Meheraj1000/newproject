import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { paymentType } from "../constants";


const Deposit = () => {
  const {user} = useAuth();
  const [amount, setAmount] = useState("");
  const [payType, setPayType] = useState("");
  

  const navigate = useNavigate();

  const quickAmounts = [400, 600, 1000, 1500, 2000, 3000];
  const isReady = amount && payType;

  const handleSubmit = () => {
    if (!isReady) return;

    navigate("/depositPanding", {
      state: {
        amount,
        payType,
      },
    });
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen pb-10">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-4 font-semibold shadow flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 text-white text-lg">
          ← ফিরে
        </Link>
        <h2 className="absolute left-1/2 -translate-x-1/2 text-lg">
          Recharge
        </h2>
        <span className="opacity-0">back</span>
      </div>

      <div className="max-w-5xl mx-auto mt-6 p-4">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-6 rounded-xl">
          <p className="text-lg">বর্তমান ব্যালেন্স</p>
          <h2 className="text-4xl font-bold mt-1">{user?.balance || 0}</h2>
        </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="জমা পরিমাণ"
          className="w-full border border-indigo-500 rounded-lg p-3 mt-5 text-lg"
        />

        <div className="grid grid-cols-3 gap-4 mt-4">
          {quickAmounts?.map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              className={`py-3 rounded-md font-semibold border ${
                Number(amount) === amt
                  ? "bg-indigo-600 text-white"
                  : "bg-white"
              }`}
            >
              Tk {amt}
            </button>
          ))}
        </div>

        <div className="border rounded-lg p-4 mt-5 bg-white">
          <p className="font-semibold mb-3">Pay Type:</p>
          <div className="grid grid-cols-2 gap-4">
            {[paymentType.BKASH, paymentType.NAGAD]?.map((method) => (
              <div
                key={method}
                onClick={() => setPayType(method)}
                className={`p-3 border rounded-lg cursor-pointer ${
                  payType === method
                    ? "bg-indigo-600 text-white"
                    : ""
                }`}
              >
                <input type="radio" checked={payType === method} readOnly />
                <span className="ml-2">{method}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isReady}
          className={`w-full py-3 mt-6 rounded-lg text-lg font-semibold ${
            isReady
              ? "bg-gradient-to-r from-indigo-600 to-purple-500 text-white"
              : "bg-gray-300"
          }`}
        >
          এখনই রিচার্জ করুন
        </button>
      </div>
    </div>
  );
};

export default Deposit;
