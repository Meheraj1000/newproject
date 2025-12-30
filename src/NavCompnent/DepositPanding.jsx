import React, { useState } from "react";

const DepositPanding = () => {
  const [method, setMethod] = useState("bkash");
  const [trxId, setTrxId] = useState("");

  const walletNumber = "01806114664"; // screenshot wallet

  const handleSubmit = () => {
    if (!trxId) {
      alert("TrxID প্রদান করুন!");
      return;
    }
    alert("জমা অনুরোধ সফলভাবে পাঠানো হয়েছে!");
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-b-lg pb-10">

      {/* Top section */}
      <div className="bg-green-600 text-center text-white py-5 rounded-b-3xl">
        <p className="text-sm">অর্ডার আইডি: 838591109730219926</p>
        <h1 className="text-4xl font-bold mt-2">৳ 500.00</h1>
      </div>

      {/* Payment channel */}
      <div className="px-4 mt-6">
        <p className="font-bold text-gray-700 mb-1">পেমেন্ট চ্যানেল</p>

        <div className="flex items-center gap-5 mb-3">
          <button
            onClick={() => setMethod("bkash")}
            className={`px-4 py-2 border rounded-full font-semibold ${
              method === "bkash"
                ? "border-pink-600 text-pink-600 bg-pink-50"
                : "border-gray-300"
            }`}
          >
            bKash
          </button>

          <button
            onClick={() => setMethod("nagad")}
            className={`px-4 py-2 border rounded-full font-semibold ${
              method === "nagad"
                ? "border-orange-500 text-orange-500 bg-orange-50"
                : "border-gray-300"
            }`}
          >
            Nagad
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-4">
        <p className="text-sm font-semibold text-gray-800">
          শুরু ২টি ধাপে, পেমেন্টটি সম্পন্ন করুন।
        </p>

        <p className="text-xs text-blue-600 cursor-pointer">
          বিস্তারিত ব্যাখ্যা ›
        </p>
      </div>

      {/* Step 1 */}
      <div className="px-4 mt-4 border border-green-400 rounded-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-2">
          ১) এই {method === "bkash" ? "bKash" : "Nagad"} নাম্বারে নিচের কাশআউট করুন
        </h3>

        <div className="flex justify-between items-center bg-green-50 border p-3 rounded-lg">
          <div>
            <p className="text-sm font-semibold text-gray-700">Wallet No*</p>
            <p className="text-xl font-bold text-gray-900">{walletNumber}</p>
          </div>

          {/* Copy button */}
          <button
            className="px-4 py-1 text-sm bg-green-500 text-white rounded"
            onClick={() => {
              navigator.clipboard.writeText(walletNumber);
              alert("নম্বার কপি করা হয়েছে!");
            }}
          >
            কপি
          </button>
        </div>

        <button className="w-full mt-3 text-sm bg-red-100 text-red-600 py-2 rounded">
          কাশআউট দিয়ে পেমেন্ট করুন
        </button>
      </div>

      {/* Step 2 */}
      <div className="px-4 mt-4 border border-green-400 rounded-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-2">
          ২) কাশআউটটির TrxID নাম্বার লিখুন (প্রয়োজন)
        </h3>

        <input
          type="text"
          placeholder="TrxID অবশ্যই প্রদান করতে হবে"
          className="w-full border p-3 rounded"
          value={trxId}
          onChange={(e) => setTrxId(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <div className="px-4 mt-3">
        <button
          onClick={handleSubmit}
          className="w-full bg-gray-300 text-gray-700 py-3 rounded font-bold disabled:opacity-60"
        >
          জমা দিন
        </button>
      </div>

      {/* Footer text */}
      <p className="text-xs text-gray-600 px-4 mt-4 leading-6">
        গুরুত্বপূর্ণ: পেমেন্টটি সফলভাবে সম্পন্ন করার পর জমা অনুরোধটি পাঠান।
        ভুল ট্রান্সফার হলে এগ্রিক কেয়ার দায়ী থাকবে না।  
        আপনার কাশআউট রসিদের স্ক্রিনশট সংরক্ষণ করুন।
      </p>
    </div>
  );
};

export default DepositPanding;
