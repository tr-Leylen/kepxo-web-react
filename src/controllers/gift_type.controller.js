import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL

export const createGiftType = async(data)=>{
    try {
        const res = await axios.post(`${baseURL}gifttype`,data)
        return res;
    } catch (error) {
        return error
    }
}
export const updateGiftType = async({id,data})=>{
    try {
        const res = await axios.put(`${baseURL}gifttype/${id}`,data)
        return res;
    } catch (error) {
        return error
    }
}
export const deleteGiftType = async(id)=>{
    try {
        const res = await axios.delete(`${baseURL}gifttype/${id}`)
        return res;
    } catch (error) {
        return error
    }
}
export const getOneGiftType = async(id)=>{
    try {
        const res = await axios.get(`${baseURL}gifttype/view/${id}`)
        return res;
    } catch (error) {
        return error
    }
}
export const getAllGiftTypes = async()=>{
    try {
        const res = await axios.get(`${baseURL}gifttype/all`)
        return res;
    } catch (error) {
        return error
    }
}