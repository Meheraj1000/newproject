import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthPage/AuthProvider";

const Virtue = () => {
  const { user } = useContext(AuthContext);
  const [now, setNow] = useState(new Date());
  const [savedVirtues, setSavedVirtues] = useState([]);

  /* ================= REAL-TIME CLOCK ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ================= FETCH VIRTUES FROM CONTEXT / LOCAL STORAGE ================= */
  useEffect(() => {
    if (user?.virtues?.length > 0) {
      setSavedVirtues(user.virtues);
      localStorage.setItem("virtuesData", JSON.stringify(user.virtues));
    } else {
      const stored = localStorage.getItem("virtuesData");
      if (stored) setSavedVirtues(JSON.parse(stored));
    }
  }, [user?.virtues]);

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-400 text-white p-4 font-semibold shadow-md flex items-center justify-between relative">
        <Link
          to="/"
          className="flex items-center gap-1 text-white text-lg hover:opacity-80"
        >
          <span className="text-xl">←</span> ফিরে
        </Link>

        <h2 className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">
          পণ্য
        </h2>
        <span className="opacity-0">Back</span>
      </div>

      <div className="p-4">
        {savedVirtues.length === 0 ? (
          <p className="text-gray-500 text-center">আপনি এখনও কিছু কেনেননি।</p>
        ) : (
          savedVirtues.map((item, index) => {
            /* ================= AMOUNT ================= */
            const dailyIncome = Number(
              (item.price || 0).toString().replace(/,/g, "")
            );
            const totalIncome = Number(
              (item.income || 0).toString().replace(/,/g, "")
            );
            const productPrice = Number(
              (item.target || 0).toString().replace(/,/g, "")
            );
            const totalDays = item.totalDays || 365;

            /* ================= PURCHASE DATE ================= */
            const purchaseDate = item.date ? new Date(item.date) : new Date();
            const validPurchaseDate = isNaN(purchaseDate.getTime())
              ? new Date()
              : purchaseDate;

            /* ================= REAL CALENDAR DAYS ================= */
            const start = new Date(
              validPurchaseDate.getFullYear(),
              validPurchaseDate.getMonth(),
              validPurchaseDate.getDate()
            );

            const today = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate()
            );

            const diffDays = Math.floor(
              (today - start) / (1000 * 60 * 60 * 24)
            );

            const progressDays = Math.min(
              Math.max(diffDays, 0),
              totalDays
            );

            const currentDailyIncome = dailyIncome * progressDays;

            /* ================= REAL-TIME HOURS ================= */
            const diffHours = Math.floor(
              (now.getTime() - validPurchaseDate.getTime()) /
                (1000 * 60 * 60)
            );

            const hoursWorked = Math.max(diffHours, 0);

            /* ================= PURCHASE DATE STRINGS ================= */
            const purchaseDateString = validPurchaseDate.toLocaleDateString(
              "en-GB"
            );
            const purchaseTimeString = validPurchaseDate.toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            );

            return (
              <div
                key={index}
                className="relative bg-white p-4 shadow-md rounded-3xl mb-4"
              >
                {/* Date Badge */}
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-tr-3xl rounded-bl-3xl text-sm z-10">
                  📅 {purchaseDateString} ⏰ {purchaseTimeString}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 text-center bg-white py-5 mb-3">
                  <div>
                    <h3 className="text-green-600 font-bold text-xl">
                      Tk{currentDailyIncome.toFixed(2)}
                    </h3>
                    <p className="text-gray-600 text-sm">দৈনিক আয়</p>
                  </div>

                  <div>
                    <h3 className="text-green-600 font-bold text-xl">
                      Tk{totalIncome.toFixed(2)}
                    </h3>
                    <p className="text-gray-600 text-sm">মোট আয়</p>
                  </div>

                  <div>
                    <h3 className="text-green-600 font-bold text-xl">
                      Tk{productPrice.toFixed(2)}
                    </h3>
                    <p className="text-gray-600 text-sm">পণ্যের মূল্য</p>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={item.image || ""}
                    alt={item.name || "No Name"}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-md font-bold text-black">
                      {item.name || "Unnamed"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      Working for {hoursWorked}{" "}
                      {hoursWorked === 1 ? "Hour" : "Hours"}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex justify-between p-4 bg-red-600 text-sm mt-2 rounded-md">
                  <span className="text-white">
                    সময়কাল: {progressDays} / {totalDays}
                  </span>
                  <span className="text-white font-bold">
                    মোট অর্জন : Tk
                    {(totalIncome + currentDailyIncome).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })
        )}

        {savedVirtues.length > 0 && (
          <p className="text-center text-gray-400 mt-5">No More Data</p>
        )}
      </div>
    </div>
  );
};

export default Virtue;
