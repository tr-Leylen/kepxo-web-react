import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL
export const login = async (data) => {
    try {
        const response = await axios.post(`${baseURL}auth/login`, data)
        if (response.data.role === "user") throw new Error("User don't login this app")
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const registerUser = async (data) => {
    try {
        const res = await axios.post(`${baseURL}auth/register`, data)
        return res;
    } catch (error) {
        return error
    }
}

export const resetPassword = async (data) => {
    try {
        const res = await axios.post(`${baseURL}auth/reset-password`, data);
        return res;
    } catch (error) {
        return error;
    }
}

export const forgotPassword = async (data) => {
    try {
        const res = await axios.post(`${baseURL}auth/forgot-password`, data)
        return res;
    } catch (error) {
        return error;
    }
}