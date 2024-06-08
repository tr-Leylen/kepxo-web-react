import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

export const uploadImage = async (img) => {
    try {
        const res = await axios.post(`${baseURL}photo`, img)
        return res;
    } catch (error) {
        return error;
    }
}