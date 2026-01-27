import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyInvestmentsApi } from "../api/services/investmentApi";
import { getTotalDaysFromInvestDay, getTotalHoursFromInvestDay } from "../utils/formatedDate";

const Virtue = () => {
  const [savedVirtues, setSavedVirtues] = useState([]);


  /* ================= FETCH VIRTUES ================= */
  useEffect(() => {
    const fetchMyInvestments = async () => {
      try {
        const res = await getMyInvestmentsApi();
        setSavedVirtues(res?.data || []);
      } catch (error) {
        console.error("Error fetching investments:", error);
      }
    };

    fetchMyInvestments();
  }, []);
  console.log("Saved virtues: ", savedVirtues);


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

      <div className="p-4 sm:p-6">
        {savedVirtues?.length === 0 ? (
          <p className="text-gray-500 text-center">আপনি এখনও কিছু কেনেননি।</p>
        ) : (
          savedVirtues?.map((item, index) => {
            const dailyIncome = Number(item?.productId?.dailyProfit || 0); console.log("Daily Income:", item);
            const productPrice = Number(item.amount || 0);
            const totalDays = item.productId?.investmentDayCycle || 0;

            const purchaseDate = item.date ? new Date(item.date) : new Date();
            const validPurchaseDate = isNaN(purchaseDate.getTime()) ? new Date() : purchaseDate;

            const getHours = getTotalHoursFromInvestDay(item?.createdAt);
            const getDayFromInvest = getTotalDaysFromInvestDay(item?.createdAt);

            const purchaseDateString = validPurchaseDate.toLocaleDateString("en-GB");
            const purchaseTimeString = validPurchaseDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            return (
              <div
                key={index}
                className="relative bg-white p-4 sm:p-5 md:p-6 shadow-md hover:shadow-xl rounded-3xl mb-6 transition-all duration-300"
              >
                {/* Date Badge */}
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-tr-3xl rounded-bl-3xl text-xs sm:text-sm z-10 shadow">
                  📅 {purchaseDateString} ⏰ {purchaseTimeString}
                </div>

                {/* Stats */}
                <div className="flex justify-between sm:flex-row items-end gap-4 sm:gap-6 mt-3">
                  {/* Image */}
                  <div className="flex gap-3">
                    <img
                      src={item?.productId?.image || ""}
                      alt={item?.productId?.title}
                      className="w-full max-w-[120px] sm:max-w-[150px] md:max-w-[180px] h-auto object-cover rounded-xl shadow-sm"
                    />
                    {/* Product Info */}
                    <div className="text-start">
                      <h3 className="text-md sm:text-lg md:text-xl font-semibold text-black">{item?.productId?.title || "Unnamed"}</h3>

                      <div className="text-start mt-2">

                        <p className="text-gray-600 text-xs sm:text-sm">দৈনিক আয়</p>
                        <h3 className="text-indigo-600 font-semibold">Tk {dailyIncome.toFixed(2)}</h3>

                      </div>

                      <p className="text-xs sm:text-sm text-gray-500 font-medium">Hours Worked: {getHours}</p>
                    </div>
                  </div>

                  {/*Total Profit */}
                  <div className="text-center">
                    <h3 className="text-green-600 font-bold text-lg sm:text-xl md:text-2xl">Tk {item?.productId?.totalProfit}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">মোট আয়</p>
                  </div>
                </div>



                {/* Progress / Stats */}
                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-white text-sm sm:text-base mt-4 rounded-lg shadow-md">
                  <span>সময়কাল: {getDayFromInvest} / {totalDays} দিন</span>
                  <span>পণ্যের মূল্য : Tk {productPrice}</span>
                  <span>মোট অর্জন : Tk {item?.productId?.dailyProfit * Number(getDayFromInvest)}</span>
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
