import React, { useEffect, useState } from "react";

const WithdrawPanding = () => {
  const [amount, setAmount] = useState("");

  // FIX: Declare withdraws state
  const [withdraws, setWithdraws] = useState([]);

  // FIX: Declare selected image for preview (optional)
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("withdrawal.json")
      .then((res) => res.json())
      .then((data) => setWithdraws(data))
      .catch((err) => console.error(err));
  }, []);

  // User demo data
  const user = {
    balance: 99,
    name: "Md Meherajul Karim",
    account: "01890082565",
  };

  const handleWithdraw = () => {
    if (!amount) {
      alert("উত্তোলনের পরিমাণ লিখুন!");
      return;
    }
    if (amount > user.balance) {
      alert("পর্যাপ্ত ব্যালেন্স নেই!");
      return;
    }
    alert("Withdraw Request Submitted!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white pb-10">

      {/* Top Title */}
      <h2 className="text-center text-2xl font-bold bg-green-500 text-white py-2">
        টাকা তোলা
      </h2>

      {/* Balance Box */}
      <div className="bg-green-500 text-white text-3xl font-bold text-center py-6 mt-4 rounded">
        বর্তমান ব্যালেন্স
        <div className="text-4xl mt-2">Tk {user.balance}</div>
      </div>

      {/* Withdraw Section */}
      <div className="mt-6 space-y-4">
        <input
          type="number"
          placeholder="Tk  উত্তোলনের পরিমাণ"
          className="w-full border-2 border-green-400 p-3 rounded text-xl"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          value={user.name}
          readOnly
          className="w-full border p-3 rounded bg-green-50"
          placeholder="Account Name"
        />

        <input
          type="text"
          value={user.account}
          readOnly
          className="w-full border p-3 rounded bg-green-50"
          placeholder="Account"
        />

        <button
          onClick={handleWithdraw}
          className="w-full bg-green-500 text-white py-3 rounded text-xl font-bold"
        >
          এখনই প্রত্যাহার করুন
        </button>

        <p className="text-center text-gray-600 px-4">
          আপনার প্রথম টাকা তোলার আগে, আপনার ব্যাংকের তথ্য সঠিক কিনা তা নিশ্চিত করুন
        </p>
      </div>

      {/* Previous History Section */}
      <h3 className="text-center text-xl font-semibold mt-8 text-gray-700">
        ব্যবহারকারীর প্রত্যাহারের পূর্বশা
      </h3>

      {/* List Container */}
      <div className="mt-4 space-y-4">
        {withdraws.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow flex flex-col gap-4 border border-gray-200"
          >
            {/* Details */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <p className="text-sm text-gray-700 font-medium">
                <span className="font-semibold">Mobile:</span> {item.mobile}
              </p>
              <p className="text-sm text-gray-700 font-medium">
                <span className="font-semibold">Date:</span> {item.date}
              </p>
            </div>

            <p className="text-gray-800 text-start text-sm mt-2 leading-snug">
              {item.comment}
            </p>

            {/* Image */}
            <img
              src={item.image}
              alt="user"
              className="w-full h-28 rounded-lg object-cover border cursor-pointer hover:scale-105 transition transform"
              onClick={() => setSelectedImage(item.image)}
            />
          </div>
        ))}
      </div>

      {/* Full Screen Image Preview (Optional) */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="preview"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default WithdrawPanding;
