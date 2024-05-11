import axios from "axios"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebase";
const storage = getStorage(app)

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

export const updateCourse = async ({ id, data }) => {
    try {
        const res = await axios.put(`${baseURL}course/update/${id}`, data)
        return res.data
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

export const uploadImage = async (data) => {
    try {
        const imageRef = ref(storage, data?.userId + data?.title)
        await uploadBytes(imageRef, data.file).catch(err => console.log(err))
        const url = await getDownloadURL(imageRef).catch(error => console.log(error))
        return url;
    } catch (error) {
        console.log(error)
    }
}

export const deleteCourse = async (id) => {
    try {
        const res = await axios.delete(`${baseURL}course/delete/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const getCourse = async (id) => {
    try {
        const res = await axios.get(`${baseURL}course/view/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}