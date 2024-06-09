import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL

export const createGift = async (data) => {
    try {
        const res = await axios.post(`${baseURL}gift/create`, data)
        return res;
    } catch (error) {
        return error
    }
}

export const updateGift = async ({ id, data }) => {
    try {
        const res = await axios.put(`${baseURL}gift/${id}`, data)
        return res;
    } catch (error) {
        return error
    }
}

export const getAllGifts = async ({ page, limit }) => {
    try {
        const res = await axios.get(`${baseURL}gift/all?page=${page}&limit=${limit}`)
        return res;
    } catch (error) {
        return error
    }
}

export const getOneGift = async (id) => {
    try {
        const res = await axios.get(`${baseURL}gift/view/${id}`)
        return res;
    } catch (error) {
        return error
    }
}

export const deleteGift = async (id) => {
    try {
        const res = await axios.delete(`${baseURL}gift/${id}`);
        return res;
    } catch (error) {
        return error;
    }
}