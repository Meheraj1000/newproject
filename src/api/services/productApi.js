import { api } from "../lib/api";

// POST /products (Bearer লাগবে, interceptor auto attach করবে)
export const createProductApi = async (payload) => {
    const res = await api.post("/products", payload);
    console.log("Create Product api response:", res)
    return res.data;
};

export const getProductApi = async () => {
    const res = await api.get("/products");
    return res.data;
};
