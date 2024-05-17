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

export const getTeachers = async () => {
    try {
        const res = await axios.get(`${baseURL}user/teachers`)
        return res.data
    } catch (error) {
        return error
    }
}

export const getTeachersPaged = async (page) => {
    try {
        const res = await axios.get(`${baseURL}user/teachers-paged?page=${page}`)
        return res;
    } catch (error) {
        return error
    }
}