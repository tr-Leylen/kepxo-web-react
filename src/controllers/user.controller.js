import axios from "axios"
import toast from "react-hot-toast"

const baseURL = import.meta.env.VITE_BASE_URL

export const getUserRole = async (id) => {
    try {
        const response = await axios.get(`${baseURL}user/view/${id}`)
        return response.data.role
    } catch (error) {
        toast.error(error.response?.message)
    }
}