import { api } from "../lib/api";

// POST /users
export const registerUserApi = async (payload) => {
    console.log("userApi.js: registerUserApi called with", payload);
    const res = await api.post("/users", payload);
    return res.data;
};

// GET /users/my-profile (তুমি বলেছো token লাগবে না)
export const myProfileApi = async () => {
    console.log("userApi.js: myProfileApi called");
    const res = await api.get("/users/my-profile");
    return res.data;
};
