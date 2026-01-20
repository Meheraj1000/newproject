import { api, setAccessToken } from "../lib/api";

// POST /auth/login
export const loginApi = async ({ mobile, password }) => {
    console.log("authApi.js: loginApi called with", { mobile, password });
    const res = await api.post("/auth/login", { mobile, password });

    // backend token structure অনুযায়ী adjust (আমি দুইটা ধরেছি)
    const token = res.data?.data?.accessToken || res.data?.accessToken;

    if (token) setAccessToken(token);

    return res.data;
};

// (optional) POST /auth/logout যদি থাকে
export const logoutApi = async () => {
    console.log("authApi.js: logoutApi called");
    const res = await api.post("/auth/logout");
    setAccessToken(null);
    return res.data;
};
