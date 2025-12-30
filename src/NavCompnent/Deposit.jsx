import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Deposit = () => {
    const [amount, setAmount] = useState("1000");
    const [payType, setPayType] = useState("");

    const navigate = useNavigate();

    const quickAmounts = [400, 600, 1000, 1500, 2000, 3000];

    const isReady = amount && payType;

    const handleSubmit = () => {
        if (!isReady) return;

        // redirect to your next page
        navigate("/depositPanding");
    };

    return (
        <div className="w-full bg-gray-100 min-h-screen pb-10">

            {/* Header */}
            <div className="relative bg-gradient-to-r from-green-600 to-teal-400 text-white p-4 font-semibold shadow flex items-center justify-between">

                {/* Back Button */}
                <Link
                    to="/"
                    className="flex items-center gap-1 text-white text-lg hover:opacity-80"
                >
                    <span className="text-xl">←</span> ফিরে
                </Link>

                {/* Title Center */}
                <h2 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold">
                    Recharge
                </h2>

                <span className="opacity-0">back</span>
            </div>

            <div className="max-w-5xl mx-auto mt-6 p-4">

                {/* Balance */}
                <div className="bg-gradient-to-r from-green-600 to-teal-400 text-white p-6 rounded-xl shadow text-left">
                    <p className="text-lg">বর্তমান ব্যালেন্স</p>
                    <h2 className="text-4xl font-bold mt-1">{amount}</h2>
                </div>

                {/* Amount Input */}
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="জমা পরিমাণ"
                    className="w-full border border-green-500 rounded-lg p-3 mt-5 text-lg outline-none focus:border-green-700 transition"
                />

                {/* Quick buttons */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {quickAmounts.map((amt) => (
                        <button
                            key={amt}
                            onClick={() => setAmount(amt)}
                            className={`py-3 rounded-md font-semibold border transition-all duration-200 
                            ${Number(amount) === amt
                                    ? "bg-green-500 text-white scale-105 shadow"
                                    : "text-gray-700 bg-white hover:bg-green-100"
                                }`}
                        >
                            Tk {amt}
                        </button>
                    ))}
                </div>

                {/* Payment Type Section */}
                <div className="border rounded-lg p-4 mt-5 shadow bg-white">
                    <p className="font-semibold mb-3">Pay Type:</p>

                    <div className="grid grid-cols-2 gap-4">
                        {["Bkash", "Nagad"].map((method) => (
                            <div
                                key={method}
                                onClick={() => setPayType(method)}
                                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition 
                                ${payType === method
                                        ? "bg-green-500 text-white shadow scale-[1.03]"
                                        : "hover:bg-gray-100"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    checked={payType === method}
                                    onChange={() => setPayType(method)}
                                />
                                <span>{method}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={!isReady}
                    className={`w-full py-3 mt-6 rounded-lg text-lg font-semibold transition 
                    ${isReady
                            ? "bg-gradient-to-r from-green-600 to-teal-400 text-white hover:scale-[1.03]"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    এখনই রিচার্জ করুন
                </button>

                {/* Warning */}
                <p className="text-red-600 text-[10px] font-bold mt-4 leading-relaxed text-left">
                    সতর্কঃ অর্থপ্রদান সম্পূর্ণ করার পরে, বিলে 10-সংখ্যার লেনদেন আইডি কপি করে আমাদের সিস্টেমে জমা দিতে ভুলবেন না।
                    আপনার অর্থপ্রদান স্বয়ংক্রিয়ভাবে আপনার অ্যাকাউন্ট ব্যালেন্সে জমা হয়ে যাবে। <br />
                    আপনি যদি অন্য সমস্যার সম্মুখীন হন, সাহায্যের জন্য প্ল্যাটফর্ম গ্রাহক পরিষেবার সাথে যোগাযোগ করুন।
                </p>
            </div>
        </div>
    );
};

export default Deposit;
