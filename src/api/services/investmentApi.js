import { api } from "../lib/api";

export const createProductApi = async (payload) => {
    const { productId, amount } = payload;
    const res = await api.post("/investments", { productId, amount });
    console.log("Create investments api response:", res)
    return res.data;
};

export const getMyInvestmentsApi = async () => {
    const res = await api.get("/investments/my");
    console.log("Get investments res: ", res)
    return res.data;
};

export const getPendingInvestmentsAdminApi = async () => {
    const res = await api.get("/investments/pending");
    console.log("Get pending investments res: ", res)
    return res.data;
};

export const updateInvestmentStatusAdminApi = async (investmentId, status) => {
    const res = await api.patch(`/investments/${investmentId}/status`, status);
    console.log("Update investment status res: ", res)
    return res.data;
};
