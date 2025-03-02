import api from "../config/api.config"

export const getUser = async (id) => {
    try {
        const res = await api.get(`user/view/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async ({ userId, data }) => {
    try {
        const response = await api.put(`user/${userId}`, data)
        return response;
    } catch (error) {
        return error
    }
}

export const getTeachers = async () => {
    try {
        const res = await api.get(`user/teachers`)
        return res.data
    } catch (error) {
        return error
    }
}

export const getTeachersPaged = async ({ page, limit }) => {
    try {
        const res = await api.get(`user/teachers-paged?page=${page}&limit=${limit}`)
        return res;
    } catch (error) {
        return error
    }
}

export const getUsersPaged = async ({ page, limit }) => {
    try {
        const res = await api.get(`user/users?page=${page}&limit=${limit}`)
        return res;
    } catch (error) {
        return error
    }
}

export const deleteUser = async (id) => {
    try {
        const res = await api.delete(`user/${id}`)
        return res;
    } catch (error) {
        return error
    }
}

export const searchUser = async ({ page, limit, username }) => {
    try {
        const res = await api.get(`user/search-user?page=${page}&limit=${limit}&username=${username}`)
        return res;
    } catch (error) {
        return error;
    }
}
export const searchTeacher = async ({ page, limit, username }) => {
    try {
        const res = await api.get(`user/search-teacher?page=${page}&limit=${limit}&username=${username}`)
        return res;
    } catch (error) {
        return error;
    }
}