import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../AuthPage/AuthProvider";
import Swal from "sweetalert2";

const DepositPanding = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const amount = location.state?.amount || 500;

  const [method, setMethod] = useState("bkash"); // Default bKash
  const [trxId, setTrxId] = useState("");

  const walletNumber = "01806114664";

  const handleSubmit = () => {
    if (!user) {
      Swal.fire("Error", "অনুগ্রহ করে আগে লগইন করুন", "error");
      return;
    }

    if (method !== "cash" && !trxId.trim()) {
      Swal.fire("Error", "TrxID প্রদান করুন!", "error");
      return;
    }

    const newDeposit = {
      userPhone: user.phone,
      amount: Number(amount),
      trxId: method === "cash" ? "N/A" : trxId.trim(),
      method,
      status: "pending",
      createdAt: new Date().toLocaleString(),
    };

    const allDeposits = JSON.parse(localStorage.getItem("allDeposits")) || [];
    allDeposits.push(newDeposit);
    localStorage.setItem("allDeposits", JSON.stringify(allDeposits));

    Swal.fire("Success", "জমা অনুরোধ পাঠানো হয়েছে", "success");
    setTrxId("");
  };

  const getMethodLabel = (m) => {
    if (m === "bkash") return "bKash";
    if (m === "nagad") return "Nagad";
    return "Cash";
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-b-lg pb-10">

      {/* TOP */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-center text-white py-5 rounded-b-3xl">
        <p className="text-sm">অর্ডার আইডি: {Date.now()}</p>
        <h1 className="text-4xl font-bold mt-2">৳ {amount}.00</h1>
      </div>

      {/* METHOD BUTTONS */}
      <div className="px-4 mt-6">
        <p className="font-bold text-gray-700 mb-1">পেমেন্ট চ্যানেল</p>
        <div className="flex gap-4 mb-3">
          {["bkash", "nagad", "cash"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`px-4 py-2 border rounded-full font-semibold transition-colors duration-200
                ${
                  method === m
                    ? m === "bkash"
                      ? "bg-indigo-50 border-indigo-600 text-indigo-600"
                      : m === "nagad"
                      ? "bg-purple-50 border-purple-500 text-purple-500"
                      : "bg-gray-100 border-gray-400 text-gray-700 font-bold"
                    : "bg-white border-gray-300 text-gray-600"
                }`}
            >
              {getMethodLabel(m)}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1 */}
      {method !== "cash" && (
        <div className="px-4 mt-4 border border-indigo-400 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            ১) এই {getMethodLabel(method)} নাম্বারে কাশআউট করুন
          </h3>

          <div className="flex justify-between items-center bg-indigo-50 border p-3 rounded-lg">
            <div>
              <p className="text-sm font-semibold">Wallet No*</p>
              <p className="text-xl font-bold">{walletNumber}</p>
            </div>

            <button
              className="px-4 py-1 bg-indigo-600 text-white rounded"
              onClick={() => {
                navigator.clipboard.writeText(walletNumber);
                Swal.fire("Copied!", "নম্বার কপি হয়েছে", "success");
              }}
            >
              কপি
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {method !== "cash" && (
        <div className="px-4 mt-4 border border-indigo-400 rounded-lg p-4">
          <h3 className="font-semibold text-gray-700 mb-2">
            ২) কাশআউটটির TrxID লিখুন
          </h3>

          <input
            type="text"
            placeholder="TrxID অবশ্যই দিতে হবে"
            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
          />
        </div>
      )}

      {/* SUBMIT */}
      <div className="px-4 mt-3">
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-3 rounded font-bold hover:opacity-90 transition"
        >
          জমা দিন
        </button>
      </div>

      <p className="text-xs text-gray-600 px-4 mt-4 leading-6">
        পেমেন্ট সফল হলে জমা অনুরোধ পাঠান। ভুল ট্রান্সফারের দায় কর্তৃপক্ষ নেবে না।
      </p>
    </div>
  );
};

export default DepositPanding;
