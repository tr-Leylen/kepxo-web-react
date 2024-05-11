import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL
export const getUser = async (id)=>{
    try {
        const res = await axios.get(`${baseURL}user/view/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}