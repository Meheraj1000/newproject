import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const ADMIN_PHONE = "01920933383";
const ADMIN_PASSWORD = "admin@123";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const register = (phone, password, refCode) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const exists = storedUsers.find((u) => u.phone === phone);
    if (exists) return { success: false, message: "এই নম্বরটি আগেই রেজিস্টার করা আছে!" };
    if (phone === ADMIN_PHONE) return { success: false, message: "এই নম্বরটি admin-এর জন্য সংরক্ষিত!" };

    const newUser = {
      id: Date.now().toString().slice(-6),
      phone,
      password,
      refCode,
      balance: 0,
      role: "user",
      requests: [],        // Product purchase requests
      virtues: [],         // Approved products
      depositRequests: []  // Deposit requests
    };

    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    return { success: true };
  };

  const login = (phone, password) => {
    if (phone === ADMIN_PHONE && password === ADMIN_PASSWORD) {
      const adminUser = { id: "ADMIN001", phone: ADMIN_PHONE, role: "admin", balance: 0 };
      localStorage.setItem("authUser", JSON.stringify(adminUser));
      setUser(adminUser);
      return { success: true };
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = storedUsers.find(u => u.phone === phone && u.password === password);

    if (foundUser) {
      localStorage.setItem("authUser", JSON.stringify(foundUser));
      setUser(foundUser);
      return { success: true };
    }

    return { success: false, message: "ভুল মোবাইল নম্বর অথবা পাসওয়ার্ড!" };
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("authUser", JSON.stringify(updatedUser));

    // update users list
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx = users.findIndex(u => u.phone === updatedUser.phone);
    if (idx !== -1) {
      users[idx] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, register, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
