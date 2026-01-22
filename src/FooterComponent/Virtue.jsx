import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthPage/AuthProvider";

const Virtue = () => {
  const { user, setUser } = useContext(AuthContext);
  const [now, setNow] = useState(new Date());
  const [savedVirtues, setSavedVirtues] = useState([]);

  /* ================= REAL-TIME CLOCK ================= */
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* ================= FETCH VIRTUES ================= */
  useEffect(() => {
    if (user?.virtues?.length > 0) {
      setSavedVirtues(user.virtues);
      localStorage.setItem("virtuesData", JSON.stringify(user.virtues));
    } else {
      const stored = localStorage.getItem("virtuesData");
      if (stored) setSavedVirtues(JSON.parse(stored));
    }
  }, [user?.virtues]);

  /* ================= DAILY INCOME ONCE PER DAY ================= */
  useEffect(() => {
    if (!user || !savedVirtues?.length) return;

    const todayKey = `lastDailyIncome_${user.phone}`;
    const lastDate = localStorage.getItem(todayKey);
    const todayStr = now.toISOString().split("T")[0]; // "YYYY-MM-DD"

    // যদি আজকের date ইতিমধ্যেই যোগ হয়ে থাকে, আর কিছু করবে না
    if (lastDate === todayStr) return;

    let totalDailyIncome = 0;

    savedVirtues.forEach((item) => {
      const dailyIncome = Number((item.price || 0).toString().replace(/,/g, ""));
      totalDailyIncome += dailyIncome;
    });

    if (totalDailyIncome > 0) {
      setUser((prev) => ({
        ...prev,
        balance: (Number(prev.balance) || 0) + totalDailyIncome,
      }));

      // আজকের তারিখ localStorage-এ রাখলাম
      localStorage.setItem(todayKey, todayStr);
    }
  }, [now, savedVirtues, user, setUser]);

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-4 font-semibold shadow-md flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-1 text-white text-lg hover:opacity-80">
          <span className="text-xl">←</span> ফিরে
        </Link>

        <h2 className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">
          পণ্য
        </h2>
        <span className="opacity-0">Back</span>
      </div>

      <div className="p-4">
        {savedVirtues?.length === 0 ? (
          <p className="text-gray-500 text-center">আপনি এখনও কিছু কেনেননি।</p>
        ) : (
          savedVirtues?.map((item, index) => {
            const dailyIncome = Number((item.price || 0).toString().replace(/,/g, ""));
            const productPrice = Number((item.target || 0).toString().replace(/,/g, ""));
            const totalDays = item.totalDays || 365;

            const purchaseDate = item.date ? new Date(item.date) : new Date();
            const validPurchaseDate = isNaN(purchaseDate.getTime()) ? new Date() : purchaseDate;

            const start = new Date(validPurchaseDate.getFullYear(), validPurchaseDate.getMonth(), validPurchaseDate.getDate());
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const diffDays = Math.min(Math.max(Math.floor((today - start) / (1000 * 60 * 60 * 24)), 0), totalDays);

            const totalEarned = dailyIncome * diffDays;
            const diffHours = Math.floor((now - validPurchaseDate) / (1000 * 60 * 60));
            const hoursWorked = Math.max(diffHours, 0);

            const purchaseDateString = validPurchaseDate.toLocaleDateString("en-GB");
            const purchaseTimeString = validPurchaseDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            return (
              <div key={index} className="relative bg-white p-4 shadow-lg rounded-3xl mb-4 hover:shadow-xl transition-shadow duration-300">
                {/* Date Badge */}
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-tr-3xl rounded-bl-3xl text-sm z-10">
                  📅 {purchaseDateString} ⏰ {purchaseTimeString}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 text-center bg-white py-5 mb-3">
                  <div>
                    <h3 className="text-indigo-600 font-bold text-xl">Tk{dailyIncome.toFixed(2)}</h3>
                    <p className="text-gray-600 text-sm">দৈনিক আয়</p>
                  </div>

                  <div>
                    <h3 className="text-green-600 font-bold text-xl">Tk{item.income}</h3>
                    <p className="text-gray-600 text-sm">মোট আয়</p>
                  </div>

                  <div>
                    <h3 className="text-indigo-600 font-bold text-xl">Tk{productPrice.toFixed(2)}</h3>
                    <p className="text-gray-600 text-sm">পণ্যের মূল্য</p>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex items-center gap-3 mb-3">
                  <img src={item.image || ""} alt={item.name || "No Name"} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <h3 className="text-md font-bold text-black">{item.name || "Unnamed"}</h3>
                    <p className="text-xs text-gray-500">Hours Worked: {hoursWorked}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex justify-between p-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-sm mt-2 rounded-md">
                  <span className="text-white">সময়কাল: {diffDays} / {totalDays} দিন</span>
                  <span className="text-white font-bold">মোট অর্জন : Tk{item.income}</span>
                </div>
              </div>
            );
          })
        )}

        {savedVirtues?.length > 0 && <p className="text-center text-gray-400 mt-5">No More Data</p>}
      </div>
    </div>
  );
};

export default Virtue;
