import React from "react";
import { Link } from "react-router-dom";

const Bonus = () => {
  const tasks = [
    { members: 1, reward: 60 },
    { members: 3, reward: 150 },
    { members: 7, reward: 400 },
    { members: 15, reward: 850 },
    { members: 30, reward: 1500 },
    { members: 50, reward: 2500 },
    { members: 120, reward: 7000 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-20">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-400 text-white p-4 font-semibold shadow-md flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-1 text-white text-lg hover:opacity-80">
          <span className="text-xl">←</span> ফিরে
        </Link>

        <h2 className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">
          Task
        </h2>

        <span className="opacity-0">Back</span>
      </div>

      {/* TASKS SECTION */}
      <div className="py-2 px-3">

        {tasks.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white rounded-2xl shadow-lg p-4 m-2 border border-gray-200
                       transition-all duration-200 hover:shadow-xl hover:scale-[1.01]"
          >
            {/* LEFT */}
            <div className="space-y-1">
              <h1 className="text-[15px] sm:text-base font-semibold text-gray-900 leading-tight">
                {item.members} জন বৈধ সদস্যকে আমন্ত্রণ জানান
              </h1>

              <p className="text-red-600 font-semibold text-[10px]">
                মিশন পুরষ্কার: ৳{item.reward}.00
              </p>
            </div>

            {/* RIGHT */}
            <div className="text-right space-y-1 sm:space-y-2">
              <h1 className="text-gray-600 font-bold text-[11px] sm:text-[12px] px-3 py-1 rounded-lg inline-block bg-gray-100">
                সম্পূর্ণ হয়নি
              </h1>

              <div className="px-3 sm:px-4 py-[3px] sm:py-1 border-2 border-green-600 text-center rounded-xl text-green-700 font-semibold text-[13px] sm:text-lg shadow-sm">
                0 / {item.members}
              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Bonus;
