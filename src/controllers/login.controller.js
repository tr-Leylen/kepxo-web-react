import axios from "axios"

export const login = async (data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}auth/login`, data)
        return response.data
    } catch (error) {
        console.log(error.response.data)
    }
}