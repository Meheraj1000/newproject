import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaLock, FaUnlock, FaFileCsv } from "react-icons/fa";
import { getAllUsersApi } from "../api/services/userApi";
import { userStatus } from "../constants";

/* ================= CSV EXPORT ================= */
const exportCSV = (users) => {
  const header = ["Phone", "Balance", "Blocked"];
  const rows = users?.map(u => [
    u.phone,
    u.balance || 0,
    u.blocked ? "Yes" : "No"
  ]);

  let csv = header.join(",") + "\n";
  rows.forEach(r => {
    csv += r.join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "users.csv";
  a.click();
};

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [amount, setAmount] = useState("");

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await getAllUsersApi();
        console.log(res?.data);
        setUsers(res?.data);
      } catch (error) {
        console.log("error", error)
      }
    }

    getAllUsers();

  }, []);

  /* ================= SAVE USERS ================= */
  const saveUsers = (updated) => {
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  /* ================= BLOCK / UNBLOCK ================= */
  const toggleBlock = (phone) => {
    const updated = users?.map(u =>
      u.phone === phone ? { ...u, blocked: !u.blocked } : u
    );
    saveUsers(updated);
    setSelectedUser(updated.find(u => u.phone === phone));
  };

  /* ================= BALANCE UPDATE ================= */
  const updateBalance = (type) => {
    if (!amount || !selectedUser) return;

    const updated = users?.map(u => {
      if (u.phone === selectedUser.phone) {
        const newBalance =
          type === "add"
            ? Number(u.balance || 0) + Number(amount)
            : Number(u.balance || 0) - Number(amount);

        const history = u.transactions || [];
        history.push({
          type: type === "add" ? "Manual Add" : "Manual Deduct",
          amount,
          date: new Date().toLocaleString()
        });

        return { ...u, balance: newBalance, transactions: history };
      }
      return u;
    });

    saveUsers(updated);
    setSelectedUser(updated.find(u => u.phone === selectedUser.phone));
    setAmount("");
  };

  /* ================= FILTER USERS ================= */
  const filteredUsers = users.filter(u => {
    if (!u.phone) return false;
    if (filter === "blocked" && !u.blocked) return false;
    if (filter === "active" && u.blocked) return false;
    return u.phone.toString().includes(search);
  });

  const userRequests = requests.filter(
    r => r.userPhone === selectedUser?.phone
  );

  const userDeposits = deposits.filter(
    d => d.userPhone === selectedUser?.phone
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10">
        Admin User Management
      </h1>

      {/* ================= TOP CONTROLS ================= */}
      <div className="flex flex-wrap gap-3 mb-8 justify-between items-center">
        <input
          placeholder="Search by phone"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-3 rounded-lg flex-1 min-w-[200px] focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>

        <button
          onClick={() => exportCSV(users)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2 transition"
        >
          <FaFileCsv /> Export CSV
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* ================= USER LIST ================= */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md h-fit overflow-y-auto max-h-[80vh]">
          {users?.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center mt-4">No users found</p>
          ) : (
            users?.map(u => (
              <div
                key={u?._id}
                onClick={() => setSelectedUser(u)}
                className={`p-4 mb-3 rounded-lg cursor-pointer border flex justify-between items-center
                  ${u.status === userStatus.BLOCKED ? "bg-red-50 dark:bg-red-700/20" : "hover:bg-gray-100 dark:hover:bg-gray-700 transition"}`}
              >
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{u.mobile}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Tk {u.balance || 0} | {u.status === userStatus.BLOCKED ? "Blocked" : "Active"}
                  </p>
                </div>
                {u.status === userStatus.BLOCKED && <FaLock className="text-red-500" />}
              </div>
            ))
          )}
        </div>

        {/* ================= USER DETAILS ================= */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          {!selectedUser ? (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
              কোনো user নির্বাচন করুন
            </p>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {selectedUser.phone}
                </h2>
                <button
                  onClick={() => toggleBlock(selectedUser.phone)}
                  className={`px-5 py-3 rounded-lg text-white font-medium flex items-center gap-2 transition
                    ${selectedUser.blocked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                >
                  {selectedUser.blocked ? <><FaUnlock /> Unblock</> : <><FaLock /> Block</>}
                </button>
              </div>

              {/* BALANCE CONTROL */}
              <div className="flex flex-wrap gap-3 mb-6">
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="border p-3 rounded-lg flex-1 min-w-[150px] focus:ring-2 focus:ring-green-400"
                />
                <button
                  onClick={() => updateBalance("add")}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg flex items-center gap-2 transition"
                >
                  <FaPlus /> Add
                </button>
                <button
                  onClick={() => updateBalance("deduct")}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg flex items-center gap-2 transition"
                >
                  <FaMinus /> Deduct
                </button>
              </div>

              {/* TRANSACTIONS */}
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Transaction Timeline</h3>
              {(selectedUser.transactions || [])?.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 mb-4">No transactions</p>
              ) : (
                <div className="space-y-2 mb-6">
                  {selectedUser.transactions?.map((t, i) => (
                    <div key={i} className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-700 flex justify-between">
                      <p className="font-medium text-gray-700 dark:text-gray-200">{t.type}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">Tk {t.amount} | {t.date}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* DEPOSITS */}
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Deposits</h3>
              {userDeposits?.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 mb-4">No deposits</p>
              ) : (
                <div className="space-y-2 mb-6">
                  {userDeposits?.map((d, i) => (
                    <div key={i} className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-700 flex justify-between">
                      <p className="font-medium text-gray-700 dark:text-gray-200">Tk {d.amount}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{d.date}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* REQUESTS */}
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Requests</h3>
              {userRequests?.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 mb-4">No requests</p>
              ) : (
                <div className="space-y-2">
                  {userRequests?.map((r, i) => (
                    <div key={i} className="border p-4 rounded-lg bg-gray-50 dark:bg-gray-700 flex justify-between">
                      <p className="font-medium text-gray-700 dark:text-gray-200">{r.type}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-300">Tk {r.amount} | {r.date}</p>
                    </div>
                  ))}
                </div>
              )}

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
