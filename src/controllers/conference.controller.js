import api from "../config/api.config";

export const getConferences = async () => {
    try {
        const res = await api.get(`conference/all`)
        return res;
    } catch (error) {
        return error
    }
}

export const getConference = async (id) => {
    try {
        const res = await api.get(`conference/view/${id}`)
        return res;
    } catch (error) {
        return error
    }
}

export const updateConference = async ({ id, data }) => {
    try {
        const res = await api.put(`conference/update/${id}`, data)
        return res;
    } catch (error) {
        return error
    }
}

export const createConference = async (data) => {
    try {
        const res = await api.post(`conference/create`, data)
        return res;
    } catch (error) {
        return error
    }
}

export const deleteConference = async (id) => {
    try {
        const res = await api.delete(`conference/${id}`)
        return res;
    } catch (error) {
        return error;
    }
}