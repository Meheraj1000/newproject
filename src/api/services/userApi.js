import { api } from "../lib/api";

// POST /users
export const registerUserApi = async (payload) => {
    const res = await api.post("/users", payload);
    return res.data;
};

// GET /users/my-profile (তুমি বলেছো token লাগবে না)
export const myProfileApi = async () => {
    const res = await api.get("/users/my-profile");
    return res.data;
};


// GET /users get all users
export const getAllUsersApi = async () => {
    const res = await api.get("/users");
    return res.data;
};