import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";   
import { useAuth } from "../context/AuthContext";
import { depositStatus, paymentType } from "../constants";


const DepositPanding = () => {
  const location = useLocation();
  const { user } = useAuth();

  const amount = location.state?.amount || 0;
  const payType = location.state?.payType || paymentType.BKASH;

  const [method, setMethod] = useState(payType); 
  const [trxId, setTrxId] = useState("");

  const walletNumber = "01920933383";

  const depositData = {
    userId: user?._id,
    amount,
    payType,
    trxId,
    status: depositStatus.PENDING
  }
  console.log(depositData);

  const handleSubmit = () => {
    if (!user) {
      Swal.fire("Error", "অনুগ্রহ করে আগে লগইন করুন", "error");
      return;
    }


    Swal.fire("Success", "জমা অনুরোধ পাঠানো হয়েছে", "success");
  };

  const getMethodLabel = (m) => {
    if (m === paymentType.BKASH) return paymentType.BKASH;
    if (m === paymentType.NAGAD) return paymentType.NAGAD;
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-b-lg pb-10">

      {/* TOP */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-center text-white py-5 rounded-b-3xl">
        <p className="text-sm">অর্ডার আইডি: {Date.now()}</p>
        <h1 className="text-4xl font-bold mt-2">৳ {amount}</h1>
      </div>

      {/* METHOD BUTTONS */}
      <div className="px-4 mt-6">
        <p className="font-bold text-gray-700 mb-1">পেমেন্ট চ্যানেল</p>
        <div className="flex gap-4 mb-3">
          {[paymentType.BKASH, paymentType.NAGAD]?.map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`px-4 py-2 border rounded-full font-semibold transition-colors duration-200
                ${
                  method === m
                    ? m === paymentType.BKASH
                      ? "bg-indigo-50 border-indigo-600 text-indigo-600"
                      : m === paymentType.NAGAD
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
            ১) এই {getMethodLabel(method)} নাম্বারে সেন্ড মানি করুন
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
            ২) সেন্ড মানি TrxID লিখুন
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
