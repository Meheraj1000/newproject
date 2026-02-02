import React, { useState } from "react";

const Share = () => {

  // Invite link
  const inviteLink = "https://farmsellr.com/login";

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      alert("কপি করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="w-full min-h-screen bg-indigo-50 p-4">

      {/* Top Income Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="bg-white p-5 rounded-lg shadow text-center">
          <h2 className="text-3xl font-bold text-indigo-600">0</h2>
          <p className="text-gray-600 mt-1">মোট আমন্ত্রণ</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow text-center">
          <h2 className="text-3xl font-bold text-indigo-600">0.00</h2>
          <p className="text-gray-600 mt-1">মোট আয়</p>
        </div>
      </div>

      {/* Invite Code Section */}
      <div className="bg-white p-5 rounded-lg shadow mb-5">
        <h3 className="text-xl font-bold mb-2">আমার আমন্ত্রণ লিঙ্ক</h3>

        <div className="flex justify-between items-center bg-indigo-100 p-3 rounded-lg relative overflow-hidden">
          
          <span className="text-sm sm:text-lg font-semibold text-indigo-700 truncate">
            {inviteLink}
          </span>

          <button
            onClick={handleCopy}
            className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-4 py-2 rounded-lg text-sm relative"
          >
            কপি করুন

            {copied && (
              <span className="absolute right-0 text-xs bg-green-600 px-2 py-1 rounded">
                কপি হয়েছে!
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Instruction Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h3 className="text-lg text-start font-bold mb-4">
          অতিরিক্ত আয়ের জন্য এজেন্টদের প্রস্তাব করুন:
        </h3>

        <ol className="list-decimal text-start list-inside text-gray-700 text-sm space-y-3 leading-relaxed">
          <li>আমন্ত্রণ লিঙ্কটি কপি করে বন্ধুদের শেয়ার করুন।</li>
          <li>১ জন রেজিস্ট্রেশনে পাবেন ১টি রুলেট ড্র।</li>
          <li>অধীনস্থরা পণ্য কিনলে পাবেন 60-7,000 টাকা পর্যন্ত।</li>
          <li>অতিরিক্ত ৫% কমিশন পাবেন।</li>
          <li>প্রতিদিন ২% লভ্যাংশ।</li>
          <li>তারা যতদিন ইনভেস্ট করবে, আপনি ততদিন আয় করবেন।</li>
        </ol>
      </div>

    </div>
  );
};

export default Share;
