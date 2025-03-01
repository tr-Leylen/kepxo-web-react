import api from "../config/api.config";

export const createCourse = async (data) => {
    try {
        const response = await api.post(`course/create`, data);
        const newCourse = response.data;
        return newCourse;
    } catch (error) {
        console.log(error)
    }
}

export const updateCourse = async ({ id, data }) => {
    try {
        const res = await api.put(`course/update/${id}`, data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getMyCourses = async (id) => {
    try {
        const response = await api.get(`course/list/${id}`);
        const courses = response.data;
        return courses;
    } catch (error) {
        console.log(error)
    }
}

export const deleteCourse = async (id) => {
    try {
        const res = await api.delete(`course/delete/${id}`)
        return res.data;
    } catch (error) {
        return error
    }
}

export const getCourse = async (id) => {
    try {
        const res = await api.get(`course/view/${id}`)
        return res
    } catch (error) {
        return error;
    }
}

export const getCourses = async ({ page, limit }) => {
    try {
        const res = await api.get(`course/all?page=${page}&limit=${limit}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getWaitingCourses = async ({ page, limit }) => {
    try {
        const res = await api.get(`course/no-accepted?page=${page}&limit=${limit}`)
        return res
    } catch (error) {
        console.log(error)
    }
}

export const acceptCourse = async ({ data, id }) => {
    try {
        const res = await api.put(`course/accept/${id}`, data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const searchCourse = async ({ page, limit, title }) => {
    try {
        const res = await api.get(`course/search-title?page=${page}&limit=${limit}&title=${title}`)
        return res;
    } catch (error) {
        return error
    }
}