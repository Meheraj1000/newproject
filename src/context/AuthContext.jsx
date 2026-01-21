import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, setAccessToken } from "../api/lib/api";
import { loginApi } from "../api/services/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // todo

  const isAuthenticated = !!user;

  // todo
  // ✅ App start: user load (token/cookie থাকলে)
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/users/my-profile");
        const profile = res.data?.data ?? res.data?.user ?? res.data;
        console.log("AuthProvider: Loaded user profile from useEffect", profile);
        setUser(profile);
      } catch (err) {
        console.error("AuthProvider: User load failed", err);
        setUser(null);
      } finally {
        setLoading(false); // ✅ auth check done
      }
    })();
  }, []);


  // ✅ login: accessToken store + user set
  const login = async ({ mobile, password }) => {
    setLoading(true);
    try {
      const res = await loginApi({ mobile, password });

      const loggedUser =  res.data?.user;

      if (loggedUser) {
        setUser(loggedUser);
      } else {
        const me = await api.get("/users/my-profile");
        setUser(me.data?.data ?? me.data?.user ?? me.data);
      }

      return { success: true, data: res.data };
    } catch (err) {
      setUser(null);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };


  // ✅ logout: token clear + user clear
  const logout = async () => {
    setLoading(true);
    try {
      // 🔜 future backend logout
      // await api.post("/auth/logout");
    } finally {
      setAccessToken(null);
      setUser(null);
      setLoading(false);
    }
  };


  const value = useMemo(
    () => ({ user, loading, isAuthenticated, login, logout, setUser }),
    [user, loading, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
