import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL
export const getUser = async (id) => {
    try {
        const res = await axios.get(`${baseURL}user/view/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async ({ userId, data }) => {
    try {
        const response = await axios.put(`${baseURL}user/${userId}`, data)
        return response;
    } catch (error) {
        return error
    }
}

export const getTeachers = async () => {
    try {
        const res = await axios.get(`${baseURL}user/teachers`)
        return res.data
    } catch (error) {
        return error
    }
}

export const getTeachersPaged = async ({ page, limit }) => {
    try {
        const res = await axios.get(`${baseURL}user/teachers-paged?page=${page}&limit=${limit}`)
        return res;
    } catch (error) {
        return error
    }
}

export const getUsersPaged = async ({ page, limit }) => {
    try {
        const res = await axios.get(`${baseURL}user/users?page=${page}&limit=${limit}`)
        return res;
    } catch (error) {
        return error
    }
}

export const deleteUser = async (id) => {
    try {
        const res = await axios.delete(`${baseURL}user/${id}`)
        return res;
    } catch (error) {
        return error
    }
}

export const searchUser = async ({ page, limit, username }) => {
    try {
        const res = await axios.get(`${baseURL}user/search-user?page=${page}&limit=${limit}&username=${username}`)
        return res;
    } catch (error) {
        return error;
    }
}
export const searchTeacher = async ({ page, limit, username }) => {
    try {
        const res = await axios.get(`${baseURL}user/search-teacher?page=${page}&limit=${limit}&username=${username}`)
        return res;
    } catch (error) {
        return error;
    }
}