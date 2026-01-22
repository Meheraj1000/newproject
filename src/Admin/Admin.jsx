import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthPage/AuthProvider";

const Admin = () => {
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [depositRequests, setDepositRequests] = useState([]);
  const [withdrawRequests, setWithdrawRequests] = useState([]);

  const { updateAnyUserByAdmin } = useContext(AuthContext);

  useEffect(() => {
    const allRequests = JSON.parse(localStorage.getItem("allRequests")) || [];
    const allDeposits = JSON.parse(localStorage.getItem("allDeposits")) || [];
    const allWithdraws = JSON.parse(localStorage.getItem("allWithdraws")) || [];

    setPurchaseRequests(allRequests);
    setDepositRequests(allDeposits);
    setWithdrawRequests(allWithdraws);
  }, []);

  const handlePurchase = (index, approve) => {
    const request = purchaseRequests[index];
    if (!request) return;

    const updatedRequests = [...purchaseRequests];
    updatedRequests.splice(index, 1);
    setPurchaseRequests(updatedRequests);
    localStorage.setItem("allRequests", JSON.stringify(updatedRequests));

    if (approve) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const reqUser = users.find((u) => u.phone === request.userPhone);
      if (reqUser) {
        reqUser.balance = Number(reqUser.balance || 0) - Number(request.price);
        reqUser.virtues = [...(reqUser.virtues || []), request];
        updateAnyUserByAdmin(reqUser);
      }
      Swal.fire("অনুমোদিত", "পণ্য অনুমোদন হয়েছে", "success");
    } else {
      Swal.fire("প্রত্যাখ্যান", "অনুরোধ প্রত্যাখ্যান করা হয়েছে", "info");
    }
  };

  const handleDeposit = (index, approve) => {
    const deposit = depositRequests[index];
    if (!deposit) return;

    const updatedDeposits = [...depositRequests];
    updatedDeposits.splice(index, 1);
    setDepositRequests(updatedDeposits);
    localStorage.setItem("allDeposits", JSON.stringify(updatedDeposits));

    if (approve) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const depUser = users.find((u) => u.phone === deposit.userPhone);
      if (depUser) {
        depUser.balance = Number(depUser.balance || 0) + Number(deposit.amount);
        updateAnyUserByAdmin(depUser);
      }
      Swal.fire("সফল", "ব্যালেন্স যোগ হয়েছে", "success");
    } else {
      Swal.fire("প্রত্যাখ্যান", "Deposit request প্রত্যাখ্যান করা হয়েছে", "info");
    }
  };

  const handleWithdraw = (index, approve) => {
    const withdraw = withdrawRequests[index];
    if (!withdraw) return;

    const updatedWithdraws = [...withdrawRequests];
    updatedWithdraws.splice(index, 1);
    setWithdrawRequests(updatedWithdraws);
    localStorage.setItem("allWithdraws", JSON.stringify(updatedWithdraws));

    if (approve) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const wUser = users.find((u) => u.phone === withdraw.userPhone);
      if (wUser) {
        wUser.balance = Number(wUser.balance || 0) - Number(withdraw.amount);
        updateAnyUserByAdmin(wUser);
      }
      Swal.fire("Approved", "Withdraw সফল হয়েছে", "success");
    } else {
      Swal.fire("Rejected", "Withdraw বাতিল করা হয়েছে", "info");
    }
  };

  // ================= CARD COMPONENT =================
  const RequestCard = ({ children }) => (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
      {children}
    </div>
  );

  const SectionTitle = ({ title }) => (
    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-5 border-b pb-2">{title}</h2>
  );

  return (
    <div className="p-5 max-w-7xl mx-auto space-y-12">

      {/* ================= PURCHASE ================= */}
      <section>
        <SectionTitle title="Purchase Requests" />
        {purchaseRequests?.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">কোনো অনুরোধ নেই।</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {purchaseRequests?.map((r, i) => (
              <RequestCard key={i}>
                <div>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{r.name}</p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">Price: Tk {r.price}</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">By: {r.userPhone}</p>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handlePurchase(i, true)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handlePurchase(i, false)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
                  >
                    Reject
                  </button>
                </div>
              </RequestCard>
            ))}
          </div>
        )}
      </section>

      {/* ================= DEPOSIT ================= */}
      <section>
        <SectionTitle title="Deposit Requests" />
        {depositRequests?.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">কোনো অনুরোধ নেই।</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {depositRequests?.map((d, i) => (
              <RequestCard key={i}>
                <div className="space-y-1">
                  <p className="text-gray-800 dark:text-gray-100 font-medium">Amount: Tk {d.amount}</p>
                  <p className="text-gray-500 dark:text-gray-400">By: {d.userPhone}</p>
                  <p className="text-gray-500 dark:text-gray-400">TrxID: {d.trxId}</p>
                  <p className="text-gray-500 dark:text-gray-400">Method: {d.method}</p>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleDeposit(i, true)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeposit(i, false)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
                  >
                    Reject
                  </button>
                </div>
              </RequestCard>
            ))}
          </div>
        )}
      </section>

      {/* ================= WITHDRAW ================= */}
      <section>
        <SectionTitle title="Withdraw Requests" />
        {withdrawRequests?.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">কোনো Withdraw অনুরোধ নেই।</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {withdrawRequests?.map((w, i) => (
              <RequestCard key={w.id || i}>
                <div className="space-y-1">
                  <p className="text-gray-800 dark:text-gray-100 font-medium">Phone: {w.userPhone}</p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">Amount: Tk {w.amount}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Date: {w.date}</p>
                  {w.bankInfo && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {w.bankInfo.bank} | {w.bankInfo.account}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleWithdraw(i, true)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleWithdraw(i, false)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
                  >
                    Reject
                  </button>
                </div>
              </RequestCard>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Admin;
