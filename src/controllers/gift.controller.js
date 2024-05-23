import axios from "axios"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebase";

const baseURL = import.meta.env.VITE_BASE_URL

export const createGift = async (data) => {
    try {
        const res = await axios.post(`${baseURL}gift/create`, data)
        return res;
    } catch (error) {
        return error
    }
}

export const updateGift = async ({ id, data }) => {
    try {
        const res = await axios.put(`${baseURL}gift/${id}`, data)
        return res;
    } catch (error) {
        return error
    }
}

export const getAllGifts = async () => {
    try {
        const res = await axios.get(`${baseURL}gift/all`)
        return res;
    } catch (error) {
        return error
    }
}

export const getOneGift = async (id) => {
    try {
        const res = await axios.get(`${baseURL}gift/view/${id}`)
        return res;
    } catch (error) {
        return error
    }
}

export const uploadGiftImage = async({title,img})=>{
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

export const deleteGift = async(id)=>{
    try {
        const res = await axios.delete(`${baseURL}gift/${id}`);
        return res;
    } catch (error) {
        return error;
    }
}