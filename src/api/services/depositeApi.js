import { api } from "../lib/api";

// api.post("/deposits", { amount: 1000, payType: "bkash", trxID: "BK123" });
export const createDepositeApi = async (payload) => {
    const res = await api.post("/deposits", payload);
    console.log("Create deposits api response:", res)
    return res.data;
};

export const getMyDepositsApi = async () => {
    const res = await api.get("/deposits/my");
    console.log("Get deposits res: ", res)
    return res.data;
};

// /deposits/status?status=PENDING
export const getDepositeDepentOnStatusApi = async (status) => {
    const res = await api.get(`/deposits/status?status=${status}`);
    console.log("Get deposits by status res: ", res)
    return res.data;
};

export const updateDepositeStatusApi = async (depositId, status) => {
    const res = await api.patch(`/deposits/${depositId}/status`, { status: status });
    console.log("Update deposit status res: ", res)
    return res.data;
};
