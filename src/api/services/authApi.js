import { api, setAccessToken } from "../lib/api";

// POST /auth/login
export const loginApi = async ({ mobile, password }) => {
    const res = await api.post("/auth/login", { mobile, password });

    const token = res.data?.data?.accessToken;
    if (token) setAccessToken(token);
    return res.data;
};

// (optional) POST /auth/logout যদি থাকে
export const logoutApi = async () => {
    const res = await api.post("/auth/logout");
    setAccessToken(null);
    return res.data;
};
