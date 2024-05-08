import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL
export const createCourse = async (data) => {
    try {
        const response = await axios.post(`${baseURL}course/create`, data);
        const newCourse = response.data;
        return newCourse;
    } catch (error) {
        console.log(error)
    }
}

export const getMyCourses = async (id) => {
    try {
        const response = await axios.get(`${baseURL}course/list/${id}`);
        const courses = response.data;
        return courses;
    } catch (error) {
        console.log(error)
    }
}