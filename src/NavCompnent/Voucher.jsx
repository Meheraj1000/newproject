import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Voucher = () => {
  const [withdraws, setWithdraws] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For modal

  useEffect(() => {
    fetch("withdrawal.json")
      .then((res) => res.json())
      .then((data) => setWithdraws(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-4 font-semibold shadow-md flex items-center justify-between relative">

        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center gap-1 text-white text-lg hover:opacity-80"
        >
          <span className="text-xl">←</span> ফিরে
        </Link>

        {/* Center Title */}
        <h2 className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">
          Proof of Withdrawal
        </h2>
      </div>

      {/* List Container */}
      <div className="mt-4 space-y-4">
        {withdraws?.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row items-start gap-4 border border-gray-200"
          >
            {/* Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <p className="text-sm text-gray-700 font-medium">
                  <span className="font-semibold">Mobile:</span> {item.mobile}
                </p>
                <p className="text-sm text-gray-700 font-medium">
                  <span className="font-semibold">Date:</span> {item.date}
                </p>
              </div>

              <p className="text-gray-800 text-start m-2 text-sm mt-2 leading-snug">
                {item.comment}
              </p>

              {/* Image */}
              <img
                src={item.image}
                alt="user"
                className="w-full h-24 rounded-lg object-cover border cursor-pointer hover:scale-105 transition transform"
                onClick={() => setSelectedImage(item.image)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Voucher;
