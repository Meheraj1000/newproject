import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getDepositeDepentOnStatusApi, updateDepositeStatusApi } from "../api/services/depositeApi";
import { depositStatus, investmentStatus } from "../constants";
import { getPendingInvestmentsAdminApi, updateInvestmentStatusAdminApi } from "../api/services/investmentApi";
import { useAuth } from "../context/AuthContext";
import { approveWithdrawApi, getWithdrawApiByQuery, rejectWithdrawApi } from "../api/services/withdraw";
import moment from "moment";

const Admin = () => {
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [depositRequests, setDepositRequests] = useState([]);
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [loadingDeposits, setLoadingDeposits] = useState(false);
  const { setUser } = useAuth();


  useEffect(() => {
    const loadDepositRequests = async () => {
      try {
        setLoadingDeposits(true);

        // 🔹 1) Pending deposits (ADMIN)
        const depositRes = await getDepositeDepentOnStatusApi(
          depositStatus.PENDING
        );
        const deposits = depositRes?.data ?? depositRes ?? [];
        setDepositRequests(deposits);


        // 🔹 2) Pending investments (ADMIN)
        const investmentRes = await getPendingInvestmentsAdminApi();
        const investments = investmentRes?.data ?? investmentRes ?? [];
        setPurchaseRequests(investments);

        // 🔹 2) Pending withdraws (ADMIN)
        const withdrawRes = await getWithdrawApiByQuery("PENDING");
        const withdraws = withdrawRes?.data ?? withdrawRes ?? [];
        setWithdrawRequests(withdraws);

      } catch (error) {
        console.error("AdminRequests: loadDepositRequests error:", error);
        setDepositRequests([]);
        setPurchaseRequests([]);
        setWithdrawRequests([]);
      } finally {
        setLoadingDeposits(false);
      }
    };

    loadDepositRequests();

  }, []);

  const handlePurchase = async (index, approve) => {
    const purchase = purchaseRequests[index];
    console.log(purchase, approve);

    try {
      const res = await updateInvestmentStatusAdminApi(purchase._id, approve);
      const updated = res?.data ?? res;
      setUser(updated?.userId); // Update user data in context

      Swal.fire("অনুমোদিত", "পণ্য অনুমোদন হয়েছে", "success");
      const updatedRequests = [...purchaseRequests];
      updatedRequests.splice(index, 1);
      setPurchaseRequests(updatedRequests);
    } catch (error) {
      console.error("Error updating deposit status:", error);
      Swal.fire("প্রত্যাখ্যান", "Problem hoise", "info");
    }
  };

  const handleDeposit = async (index, approve) => {
    const deposit = depositRequests[index];
    console.log(deposit, approve);

    try {
      const res = await updateDepositeStatusApi(deposit._id, approve);
      const updated = res?.data ?? res;
      setUser(updated?.userId);

      Swal.fire("সফল", "ব্যালেন্স যোগ হয়েছে" | "Deposit request প্রত্যাখ্যান করা হয়েছে", "success");
    } catch (error) {
      console.error("Error updating deposit status:", error);
      Swal.fire("প্রত্যাখ্যান", "Problem hoise", "info");
    }
    const updatedDeposits = [...depositRequests];
    updatedDeposits.splice(index, 1);
    setDepositRequests(updatedDeposits);
  };


  const handleApprovedWithdraw = async (index, withdrawId) => {
    try {
      const res = await approveWithdrawApi(withdrawId);
      console.log("approveWithdraw response:", res?.data);
      const updatedWithdraws = [...withdrawRequests];
      updatedWithdraws.splice(index, 1);
      setWithdrawRequests(updatedWithdraws);
      setUser(res?.data?.userId); // Update user data in context
      Swal.fire("Approved", "Withdraw সফল হয়েছে", "success");
    } catch (error) {
      Swal.fire("Error", `${error?.response?.data?.message || "Withdraw অনুমোদন করতে সমস্যা হয়েছে"}  `, "error");
    }
  };

  const handleRegectWithdraw = async (index, withdrawId) => {
    try {
      const res = await rejectWithdrawApi(withdrawId);
      console.log("approveWithdraw response:", res?.data);
      const updatedWithdraws = [...withdrawRequests];
      updatedWithdraws.splice(index, 1);
      setWithdrawRequests(updatedWithdraws);
      Swal.fire("Rejected", "Withdraw reject সফল হয়েছে", "success");
    } catch (error) {
      Swal.fire("Error", `${error?.response?.data?.message || "Withdraw reject করতে সমস্যা হয়েছে"}  `, "error");
    }
  }

  if (loadingDeposits) {
    // ✅ Wait for auth check
    return (
      <div className="flex justify-center items-center min-h-screen">
        লোড হচ্ছে...
      </div>
    );
  }

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
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{r?.productId?.title}</p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">Price: Tk {r?.amount}</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">By: {r?.userId?.mobile}</p>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handlePurchase(i, investmentStatus.ACCEPTED)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handlePurchase(i, investmentStatus.REJECTED)}
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
                  <p className="text-gray-500 dark:text-gray-400">By: {d.userId?.mobile}</p>
                  <p className="text-gray-500 dark:text-gray-400">TrxID: {d.trxID}</p>
                  <p className="text-gray-500 dark:text-gray-400">Method: {d.payType}</p>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleDeposit(i, depositStatus.APPROVED)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeposit(i, depositStatus.REJECTED)}
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
                  <p className="text-blue-500 dark:text-gray-400 text-sm">
                    {w?.paymentType}
                  </p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">Amount: {w?.amount}৳</p>
                  <p className="text-gray-800 dark:text-gray-100 font-medium">Phone: {w?.paymentNumber}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Date: {moment(w?.createdAt).add(3, 'days').calendar()}</p>

                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleApprovedWithdraw(i, w._id)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRegectWithdraw(i, w._id)}
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
