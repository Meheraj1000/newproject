import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAccessToken, setAccessToken } from "../api/lib/api";
import { loginApi, logoutApi } from "../api/services/authApi";
import { myProfileApi } from "../api/services/userApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // todo

  const isAuthenticated = !!user;

  // ✅ App start: user load (token/cookie থাকলে)
  useEffect(() => {
    (async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          setUser(null);
          return;
        }
        const res = await myProfileApi();
        const profile = res?.data;
        setUser(profile);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false); // ✅ auth check done
      }
    })();
  }, []);
  console.log("AuthContext: user=", user);



  // ✅ login: accessToken store + user set
  const login = async ({ mobile, password }) => {
    setLoading(true);
    try {
      const res = await loginApi({ mobile, password });

      const loggedUser = res.data?.user;

      if (loggedUser) {
        setUser(loggedUser);
      } else {
        const me = await myProfileApi();
        setUser(me?.data);
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
      await logoutApi();
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
