import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL

export const getConferences = async () => {
    try {
        const res = await axios.get(`${baseURL}conference/all`)
        return res;
    } catch (error) {
        return error
    }
}

export const getConference = async (id) => {
    try {
        const res = await axios.get(`${baseURL}conference/view/${id}`)
        return res;
    } catch (error) {
        return error
    }
}

export const updateConference = async ({ id, data }) => {
    try {
        const res = await axios.put(`${baseURL}conference/update/${id}`, data)
        return res;
    } catch (error) {
        return error
    }
}

export const createConference = async (data) => {
    try {
        const res = await axios.post(`${baseURL}conference/create`, data)
        return res;
    } catch (error) {
        return error
    }
}

export const deleteConference = async (id) => {
    try {
        const res = await axios.delete(`${baseURL}conference/${id}`)
        return res;
    } catch (error) {
        return error;
    }
}