import api from "../config/api.config";

export const uploadImage = async (img) => {
    try {
        const res = await api.post(`photo`, img)
        return res;
    } catch (error) {
        return error;
    }
}