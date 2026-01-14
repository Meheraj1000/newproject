import React, { useEffect, useState } from "react";

/* ================= CSV EXPORT ================= */
const exportCSV = (users) => {
  const header = ["Phone", "Balance", "Blocked"];
  const rows = users.map(u => [
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
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
    setRequests(JSON.parse(localStorage.getItem("allRequests")) || []);
    setDeposits(JSON.parse(localStorage.getItem("allDeposits")) || []);
  }, []);

  /* ================= SAVE USERS ================= */
  const saveUsers = (updated) => {
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  /* ================= BLOCK / UNBLOCK ================= */
  const toggleBlock = (phone) => {
    const updated = users.map(u =>
      u.phone === phone ? { ...u, blocked: !u.blocked } : u
    );
    saveUsers(updated);
    setSelectedUser(updated.find(u => u.phone === phone));
  };

  /* ================= BALANCE UPDATE ================= */
  const updateBalance = (type) => {
    if (!amount) return;

    const updated = users.map(u => {
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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Admin User Management
      </h1>

      {/* ================= TOP CONTROLS ================= */}
      <div className="flex flex-wrap gap-3 mb-5 justify-between">
        <input
          placeholder="Search by phone"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>

        <button
          onClick={() => exportCSV(users)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* ================= USER LIST ================= */}
        <div className="bg-white p-4 rounded shadow h-fit">
          {filteredUsers.map(u => (
            <div
              key={u.phone}
              onClick={() => setSelectedUser(u)}
              className={`p-3 mb-2 rounded cursor-pointer border
                ${u.blocked ? "bg-red-50" : "hover:bg-gray-100"}`}
            >
              <p className="font-semibold">{u.phone}</p>
              <p className="text-sm">
                Tk {u.balance || 0} | {u.blocked ? "Blocked" : "Active"}
              </p>
            </div>
          ))}
        </div>

        {/* ================= USER DETAILS ================= */}
        <div className="md:col-span-2 bg-white p-5 rounded shadow">
          {!selectedUser ? (
            <p className="text-center text-gray-500">
              কোনো user নির্বাচন করুন
            </p>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-3">
                {selectedUser.phone}
              </h2>

              <button
                onClick={() => toggleBlock(selectedUser.phone)}
                className={`px-4 py-2 rounded text-white mb-4
                  ${selectedUser.blocked ? "bg-green-600" : "bg-red-600"}`}
              >
                {selectedUser.blocked ? "Unblock User" : "Block User"}
              </button>

              {/* BALANCE CONTROL */}
              <div className="flex gap-2 mb-6">
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="border p-2 rounded"
                />
                <button
                  onClick={() => updateBalance("add")}
                  className="bg-green-600 text-white px-3 rounded"
                >
                  Add
                </button>
                <button
                  onClick={() => updateBalance("deduct")}
                  className="bg-red-600 text-white px-3 rounded"
                >
                  Deduct
                </button>
              </div>

              {/* TRANSACTION TIMELINE */}
              <h3 className="text-xl font-semibold mb-2">
                Transaction Timeline
              </h3>

              {(selectedUser.transactions || []).length === 0 ? (
                <p className="text-gray-500">No transactions</p>
              ) : (
                selectedUser.transactions.map((t, i) => (
                  <div key={i} className="border p-2 rounded mb-2">
                    <p>{t.type} - Tk {t.amount}</p>
                    <p className="text-sm text-gray-500">{t.date}</p>
                  </div>
                ))
              )}

              {/* DEPOSITS */}
              <h3 className="text-xl font-semibold mt-4 mb-2">Deposits</h3>
              {userDeposits.length === 0 ? (
                <p className="text-gray-500">No deposits</p>
              ) : (
                userDeposits.map((d,i)=>(
                  <div key={i} className="border p-2 rounded mb-2">
                    <p>Tk {d.amount} - {d.status}</p>
                    <p className="text-sm text-gray-500">{d.date}</p>
                  </div>
                ))
              )}

              {/* REQUESTS */}
              <h3 className="text-xl font-semibold mt-4 mb-2">Requests</h3>
              {userRequests.length === 0 ? (
                <p className="text-gray-500">No requests</p>
              ) : (
                userRequests.map((r,i)=>(
                  <div key={i} className="border p-2 rounded mb-2">
                    <p>{r.type} - Tk {r.amount}</p>
                    <p className="text-sm text-gray-500">{r.date}</p>
                  </div>
                ))
              )}

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
