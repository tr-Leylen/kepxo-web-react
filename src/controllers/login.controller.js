import api from "../config/api.config";

export const login = async (data) => {
    try {
        const response = await api.post(`auth/login`, data)
        if (response.data.role === "user") throw new Error("User don't login this app")
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const registerUser = async (data) => {
    try {
        const res = await api.post(`auth/register`, data)
        return res;
    } catch (error) {
        return error
    }
}

export const resetPassword = async (data) => {
    try {
        const res = await api.post(`auth/reset-password`, data);
        return res;
    } catch (error) {
        return error;
    }
}

export const forgotPassword = async (data) => {
    try {
        const res = await api.post(`auth/forgot-password`, data)
        return res;
    } catch (error) {
        return error;
    }
}