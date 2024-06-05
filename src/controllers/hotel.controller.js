import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebase";

const baseURL = import.meta.env.VITE_BASE_URL

export const createHotel = async (data) => {
    try {
        const res = await axios.post(`${baseURL}hotel/create`, data)
        return res;
    } catch (error) {
        return error;
    }
}

export const updateHotel = async ({ id, data }) => {
    try {
        const res = await axios.put(`${baseURL}hotel/update/${id}`, data);
        return res;
    } catch (error) {
        return error;
    }
}

export const deleteHotel = async (id) => {
    try {
        const res = await axios.delete(`${baseURL}hotel/delete/${id}`);
        return res;
    } catch (error) {
        return error;
    }
}

export const getAllHotels = async () => {
    try {
        const res = await axios.get(`${baseURL}hotel/all-hotels`);
        return res;
    } catch (error) {
        return error
    }
}

export const getHotel = async (id) => {
    try {
        const res = await axios.get(`${baseURL}hotel/view/${id}`)
        return res;
    } catch (error) {
        return error;
    }
}

export const getHotelsPaged = async (page) => {
    try {
        const res = await axios.get(`${baseURL}hotel/all?page=${page}`)
        return res;
    } catch (error) {
        return error;
    }
}

export const uploadHotelImage = async ({ title, img }) => {
    try {
        const storage = getStorage(app)
        const imageRef = ref(storage, title)
        await uploadBytes(imageRef, img).catch(err => console.log(err))
        const url = await getDownloadURL(imageRef).catch(error => console.log(error))
        return url;
    } catch (error) {
        return error;
    }
}