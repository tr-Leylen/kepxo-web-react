import api from "../config/api.config";

export const createHotel = async (data) => {
    try {
        const res = await api.post(`hotel/create`, data)
        return res;
    } catch (error) {
        return error;
    }
}

export const updateHotel = async ({ id, data }) => {
    try {
        const res = await api.put(`hotel/update/${id}`, data);
        return res;
    } catch (error) {
        return error;
    }
}

export const deleteHotel = async (id) => {
    try {
        const res = await api.delete(`hotel/delete/${id}`);
        return res;
    } catch (error) {
        return error;
    }
}

export const getAllHotels = async () => {
    try {
        const res = await api.get(`hotel/all-hotels`);
        return res;
    } catch (error) {
        return error
    }
}

export const getHotel = async (id) => {
    try {
        const res = await api.get(`hotel/view/${id}`)
        return res;
    } catch (error) {
        return error;
    }
}

export const getHotelsPaged = async ({ page, limit }) => {
    try {
        const res = await api.get(`hotel/all?page=${page}&limit=${limit}`)
        return res;
    } catch (error) {
        return error;
    }
}

export const addHotelImage = async ({ id, data }) => {
    try {
        const res = await api.put(`hotel/add-image/${id}`, data)
        return res;
    } catch (error) {
        return error;
    }
}

export const removeHotelImage = async ({ id, data }) => {
    try {
        const res = await api.put(`hotel/remove-image/${id}`, data)
        return res;
    } catch (error) {
        return error;
    }
}