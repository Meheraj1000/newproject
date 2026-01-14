import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthPage/AuthProvider";

const Admin = () => {
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [depositRequests, setDepositRequests] = useState([]);

  // 🔥 AuthContext থেকে updateUser নিলাম
  const { updateUser } = useContext(AuthContext);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const allRequests = JSON.parse(localStorage.getItem("allRequests")) || [];
    const allDeposits = JSON.parse(localStorage.getItem("allDeposits")) || [];
    setPurchaseRequests(allRequests);
    setDepositRequests(allDeposits);
  }, []);

  /* ================= PRODUCT APPROVE / REJECT ================= */
  const handlePurchase = (index, approve) => {
    const request = purchaseRequests[index];
    if (!request) return;

    // request list থেকে remove
    const updatedRequests = [...purchaseRequests];
    updatedRequests.splice(index, 1);
    setPurchaseRequests(updatedRequests);
    localStorage.setItem("allRequests", JSON.stringify(updatedRequests));

    if (approve) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const reqUser = users.find(u => u.phone === request.userPhone);

      if (reqUser) {
        reqUser.balance =
          Number(reqUser.balance || 0) - Number(request.price);

        reqUser.virtues = [...(reqUser.virtues || []), request];

        // 🔥 LIVE UPDATE (Profile + Virtue)
        updateUser(reqUser);
      }

      Swal.fire("অনুমোদিত", "পণ্য অনুমোদন হয়েছে", "success");
    } else {
      Swal.fire("প্রত্যাখ্যান", "অনুরোধ প্রত্যাখ্যান করা হয়েছে", "info");
    }
  };

  /* ================= DEPOSIT APPROVE / REJECT ================= */
  const handleDeposit = (index, approve) => {
    const deposit = depositRequests[index];
    if (!deposit) return;

    // deposit list থেকে remove
    const updatedDeposits = [...depositRequests];
    updatedDeposits.splice(index, 1);
    setDepositRequests(updatedDeposits);
    localStorage.setItem("allDeposits", JSON.stringify(updatedDeposits));

    if (approve) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const depUser = users.find(u => u.phone === deposit.userPhone);

      if (depUser) {
        depUser.balance =
          Number(depUser.balance || 0) + Number(deposit.amount);

        // 🔥 LIVE UPDATE (Profile balance)
        updateUser(depUser);
      }

      Swal.fire("সফল", "ব্যালেন্স যোগ হয়েছে", "success");
    } else {
      Swal.fire(
        "প্রত্যাখ্যান",
        "Deposit request প্রত্যাখ্যান করা হয়েছে",
        "info"
      );
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto space-y-10">

      {/* ================= PURCHASE REQUESTS ================= */}
      <h2 className="text-2xl font-bold">Purchase Requests</h2>

      {purchaseRequests.length === 0 ? (
        <p>কোনো অনুরোধ নেই।</p>
      ) : (
        purchaseRequests.map((r, i) => (
          <div
            key={i}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {r.name} - Tk {r.price}
              </p>
              <p className="text-sm text-gray-600">
                By: {r.userPhone}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handlePurchase(i, true)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handlePurchase(i, false)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}

      {/* ================= DEPOSIT REQUESTS ================= */}
      <h2 className="text-2xl font-bold mt-10">Deposit Requests</h2>

      {depositRequests.length === 0 ? (
        <p>কোনো অনুরোধ নেই।</p>
      ) : (
        depositRequests.map((d, i) => (
          <div
            key={i}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p>Amount: Tk {d.amount}</p>
              <p>By: {d.userPhone}</p>
              <p>TrxID: {d.trxId}</p>
              <p>Method: {d.method}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleDeposit(i, true)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleDeposit(i, false)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
