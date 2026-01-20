import { api } from "../lib/api";

// POST /products (Bearer লাগবে, interceptor auto attach করবে)
export const createProductApi = async (payload) => {
    console.log("productApi.js: createProductApi called with", payload);
    const res = await api.post("/products", payload);
    return res.data;
};
