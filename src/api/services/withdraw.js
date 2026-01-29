import { api } from "../lib/api";

// POST /withdraws
export const createWithdrawApi = async (payload) => {
    const res = await api.post("/withdraws", payload);
    return res.data;
};

export const getWithdrawApiByQuery = async (status) => {
    const res = await api.get(`/withdraws?status=${status}`);
    return res.data;
};


export const approveWithdrawApi = async (withdrawId) => {
    const res = await api.patch(`/withdraws/approve/${withdrawId}`);
    return res.data;
};

export const rejectWithdrawApi = async (withdrawId) => {
    const res = await api.patch(`/withdraws/reject/${withdrawId}`);
    return res.data;
};
