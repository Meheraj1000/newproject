import axios from "axios";

 const API_BASE_URL = "https://farmsellr.com/api/v1";
//const API_BASE_URL = "http://localhost:4000/api/v1";
console.log("API_BASE_URL:", API_BASE_URL);

// memory + localStorage token
let accessToken = localStorage.getItem("accessToken") || null;

export const setAccessToken = (token) => {
  accessToken = token;
  if (token) localStorage.setItem("accessToken", token);
  else localStorage.removeItem("accessToken");
};

export const getAccessToken = () => accessToken;

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ✅ refresh cookie পাঠাবে
  headers: { "Content-Type": "application/json" },
});

// ✅ Request: token থাকলে Bearer add
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Optional: auto refresh on 401 (only if backend has /auth/refresh)
let isRefreshing = false;
let queue = [];

const resolveQueue = (token) => {
  queue.forEach((cb) => cb(token));
  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original?._retry) {
      original._retry = true;

      // if refresh already running, wait
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push((token) => {
            if (!token) return reject(err);
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          });
        });
      }

      isRefreshing = true;

      try {
        // ⚠️ if your backend doesn't have this endpoint, remove this part
        const r = await api.post("/auth/refresh-token");
        console.log("Token refreshed api.js", r.data);

        const newToken = r.data?.data?.accessToken || r.data?.accessToken;

        if (!newToken) throw new Error("No access token from refresh");

        setAccessToken(newToken);
        resolveQueue(newToken);

        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (refreshErr) {
        setAccessToken(null);
        resolveQueue(null);
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);
