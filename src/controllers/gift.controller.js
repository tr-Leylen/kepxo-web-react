import api from "../config/api.config";

export const createGift = async (data) => {
    try {
        const res = await api.post(`gift/create`, data)
        return res;
    } catch (error) {
        return error
    }
}

export const updateGift = async ({ id, data }) => {
    try {
        const res = await api.put(`gift/${id}`, data)
        return res;
    } catch (error) {
        return error
    }
}

export const getAllGifts = async ({ page, limit }) => {
    try {
        const res = await api.get(`gift/all?page=${page}&limit=${limit}`)
        return res;
    } catch (error) {
        return error
    }
}

export const getOneGift = async (id) => {
    try {
        const res = await api.get(`gift/view/${id}`)
        return res;
    } catch (error) {
        return error
    }
}

export const deleteGift = async (id) => {
    try {
        const res = await api.delete(`gift/${id}`);
        return res;
    } catch (error) {
        return error;
    }
}