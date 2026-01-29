import { api } from "../lib/api";

// POST /withdraws
export const createWithdrawApi = async (payload) => {
    const res = await api.post("/withdraws", payload);
    console.log("Create Withdraw api response:", res)
    return res.data;
};

export const getWithdrawApi = async () => {
    const res = await api.get("/withdraws");
    return res.data;
};
