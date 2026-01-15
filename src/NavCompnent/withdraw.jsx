import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    bank: "",
    account: "",
    mobile: "",
  });

  const [captcha, setCaptcha] = useState(
    Math.random().toString(36).substring(2, 8)
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.bank || !form.account || !form.mobile) {
      alert("সব ঘর পূরণ করুন!");
      return;
    }

    // ✅ Withdraw bank info save
    localStorage.setItem("withdrawDraft", JSON.stringify(form));

    navigate("/WithdrawPanding");
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-center text-2xl font-bold bg-green-500 text-white py-2 rounded">
        অ্যাকাউন্ট তথ্য
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="আপনার নাম"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded bg-gray-100"
        />

        <input
          type="text"
          name="bank"
          placeholder="bkash / nagad / rocket"
          value={form.bank}
          onChange={handleChange}
          className="w-full border p-3 rounded bg-gray-100"
        />

        <input
          type="text"
          name="account"
          placeholder="01XXXXXXXXX"
          value={form.account}
          onChange={handleChange}
          className="w-full border p-3 rounded bg-gray-100"
        />

        <input
          type="text"
          name="mobile"
          placeholder="+8801XXXXXXXX"
          value={form.mobile}
          onChange={handleChange}
          className="w-full border p-3 rounded bg-gray-100"
        />

        <div className="flex gap-3 items-center">
          <span className="font-bold">{captcha}</span>
          <button
            type="button"
            onClick={() =>
              setCaptcha(Math.random().toString(36).substring(2, 8))
            }
            className="text-blue-600"
          >
            Refresh
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded text-xl font-bold"
        >
          সংরক্ষণ করুন
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
