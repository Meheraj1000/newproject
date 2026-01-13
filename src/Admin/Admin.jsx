import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Admin = () => {
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [depositRequests, setDepositRequests] = useState([]);

  useEffect(() => {
    const allRequests = JSON.parse(localStorage.getItem("allRequests")) || [];
    const allDeposits = JSON.parse(localStorage.getItem("allDeposits")) || [];
    setPurchaseRequests(allRequests);
    setDepositRequests(allDeposits);
  }, []);

  const handlePurchase = (index, approve) => {
    const request = purchaseRequests[index];
    if (!request) return;

    let allRequests = [...purchaseRequests];
    allRequests.splice(index, 1);
    localStorage.setItem("allRequests", JSON.stringify(allRequests));
    setPurchaseRequests(allRequests);

    if (approve) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const reqUser = users.find(u => u.phone === request.userPhone);
      if (reqUser) {
        reqUser.balance -= request.price;
        reqUser.virtues = [...(reqUser.virtues || []), request];
        localStorage.setItem("users", JSON.stringify(users));
      }
      Swal.fire("অনুমোদিত", "পণ্য অনুমোদন হয়েছে", "success");
    } else {
      Swal.fire("প্রত্যাখ্যান", "অনুরোধ প্রত্যাখ্যান করা হয়েছে", "info");
    }
  };

  const handleDeposit = (index, approve) => {
    const deposit = depositRequests[index];
    if (!deposit) return;

    let allDeposits = [...depositRequests];
    allDeposits.splice(index, 1);
    localStorage.setItem("allDeposits", JSON.stringify(allDeposits));
    setDepositRequests(allDeposits);

    if (approve) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const depUser = users.find(u => u.phone === deposit.userPhone);
      if (depUser) {
        depUser.balance += deposit.amount;
        localStorage.setItem("users", JSON.stringify(users));
      }
      Swal.fire("সফল", "ব্যালেন্স যোগ হয়েছে", "success");
    } else {
      Swal.fire("প্রত্যাখ্যান", "Deposit request প্রত্যাখ্যান করা হয়েছে", "info");
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto space-y-10">
      <h2 className="text-2xl font-bold mb-4">Purchase Requests</h2>
      {purchaseRequests.length === 0 ? (
        <p>কোনো অনুরোধ নেই।</p>
      ) : purchaseRequests.map((r, i) => (
        <div key={i} className="border p-4 rounded flex justify-between">
          <div>
            <p>{r.name} - Tk {r.price}</p>
            <p>By: {r.userPhone}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handlePurchase(i, true)} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
            <button onClick={() => handlePurchase(i, false)} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
          </div>
        </div>
      ))}

      <h2 className="text-2xl font-bold mb-4 mt-10">Deposit Requests</h2>
      {depositRequests.length === 0 ? (
        <p>কোনো অনুরোধ নেই।</p>
      ) : depositRequests.map((d, i) => (
        <div key={i} className="border p-4 rounded flex justify-between">
          <div>
            <p>Amount: Tk {d.amount}</p>
            <p>By: {d.userPhone}</p>
            <p>TrxID: {d.trxId}</p>
            <p>Method: {d.method}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleDeposit(i, true)} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
            <button onClick={() => handleDeposit(i, false)} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin;
