import api from "../config/api.config";

export const createGiftType = async(data)=>{
    try {
        const res = await api.post(`gifttype`,data)
        return res;
    } catch (error) {
        return error
    }
}
export const updateGiftType = async({id,data})=>{
    try {
        const res = await api.put(`gifttype/${id}`,data)
        return res;
    } catch (error) {
        return error
    }
}
export const deleteGiftType = async(id)=>{
    try {
        const res = await api.delete(`gifttype/${id}`)
        return res;
    } catch (error) {
        return error
    }
}
export const getOneGiftType = async(id)=>{
    try {
        const res = await api.get(`gifttype/view/${id}`)
        return res;
    } catch (error) {
        return error
    }
}
export const getAllGiftTypes = async()=>{
    try {
        const res = await api.get(`gifttype/all`)
        return res;
    } catch (error) {
        return error
    }
}