import React, { useContext } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthPage/AuthProvider";

const steps = [
  {
    id: 1,
    title: "প্রকল্প নির্বাচন করুন",
    desc: "ফসল, পশুপালন, হাঁস-মুরগি এবং মৎস্যসহ বিভিন্ন ধরনের কৃষি প্রকল্প আবিষ্কার করুন",
    img: "https://i.ibb.co/B5SPPBfn/ca97ea3c-04f5-4d0a-9afc-54eb6559bf5c.png",
  },
  {
    id: 2,
    title: "প্রকল্প বিনিয়োগ করুন",
    desc: "আপনার মেয়াদ, রিটার্নের ধরন এবং রিটার্নের হারের সাথে সবচেয়ে উপযুক্ত প্রকল্পটি বেছে নিন।",
    img: "https://i.ibb.co/0RSG9LR4/e44c113c-9b58-4885-9d16-9d25f631953d.png",
  },
  {
    id: 3,
    title: "প্রকল্পের বৃদ্ধি পর্যবেক্ষণ করুন",
    desc: "আমরা আমাদের কৃষি উপকরণ কোম্পানিগুলির সাথে একত্রে আমাদের তালিকাভুক্ত কৃষকদের তত্ত্বাবধান করি যাতে তাদের জমির...",
    img: "https://i.ibb.co/9k22hkJk/6ba70177-d991-4f3b-80f8-62625730f33e.png",
  },
  {
    id: 4,
    title: "রিটার্ন পান",
    desc: "প্রকল্পটি সম্পন্ন হওয়ার পর, আপনার রিটার্ন আপনার নির্ধারিত ব্যাংক অ্যাকাউন্টে স্থানান্তরিত হবে।",
    img: "https://i.ibb.co/R4hSdx9x/b51f3acf-afb1-4d2c-9a65-dc5570444113.png",
  },
];

const menuItems = [
  "ব্যক্তিগত তথ্য",
  "ট্রান্সাকশন হিস্ট্রি",
  "ব্যালান্স টপআপ",
  "ব্যাংক অ্যাকাউন্ট যোগ করুন",
  "পরিচয় যাচাই",
  "নিরাপত্তা সেটিংস",
  "মোবাইল নম্বর",
  "নগদআউট সেটিংস",
];

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // localStorage থেকে user remove হবে
    navigate("/login"); // login পেজে redirect হবে
  };

  if (!user) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-gray-500">
        লগইন করুন তথ্য দেখতে
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="w-full bg-gradient-to-b from-green-100 to-white py-6 px-4 flex justify-between items-center">
        <div>
          <p className="text-sm font-semibold">{user.phone}</p>
          <p className="text-xs text-red-500 mt-1">ID: {user.id}</p>
          <p className="text-green-600 font-bold mt-2 leading-tight text-lg">
            Tk {user.balance || 0}
            <br />
            <span className="text-gray-600 text-xs font-normal">
              বর্তমান ব্যালেন্স
            </span>
          </p>
        </div>

        <div className="flex gap-6 sm:gap-8 text-right">
          <div className="text-green-600 font-semibold leading-tight text-sm">
            চেক করা <br />
            <span className="text-gray-600 text-xs font-normal">
              প্রচার আয়: Tk {user.promoIncome || 0}
            </span>
          </div>

          <div className="text-green-600 font-semibold leading-tight text-sm">
            চেক করা <br />
            <span className="text-gray-600 text-xs font-normal">
              খামার আয়: Tk {user.farmIncome || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Icons */}
      <div className="flex justify-between px-10 mt-6">
        <Link to="/deposit" className="text-center">
          <img
            src="https://s.agricare.club/static/home/img/icon_01.png?v=gf2"
            alt="deposit"
            className="w-10 sm:w-12 mx-auto"
          />
          <span className="text-sm block mt-1">জমা</span>
        </Link>

        <Link to="/withdraw" className="text-center">
          <img
            src="https://s.agricare.club/static/home/img/icon_02.png?v=gf2"
            alt="withdraw"
            className="w-10 sm:w-12 mx-auto"
          />
          <span className="text-sm block mt-1">টাকা তোলা</span>
        </Link>
      </div>

      {/* Steps */}
      <div className="px-4 mt-4 space-y-5">
        {steps.map((step) => (
          <Link
            to="/bonus"
            key={step.id}
            className="block bg-white rounded-2xl p-4 shadow-md flex gap-3 relative hover:shadow-lg transition duration-200"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
              <img
                src={step.img}
                alt="step"
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-bold leading-tight">
                {step.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mt-1">{step.desc}</p>
            </div>

            <div className="absolute top-0 right-0 bg-green-100 px-3 py-1 rounded-bl-xl text-green-700 text-sm font-semibold">
              ধাপ {step.id}
            </div>
          </Link>
        ))}
      </div>

      {/* Menu */}
      <div className="px-4 mt-8 space-y-3 pb-10">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to="/"
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border cursor-pointer"
          >
            <span className="text-gray-700 text-sm sm:text-base">{item}</span>
            <FaChevronRight className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full mt-6 text-red-600 font-bold text-center"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
