import axios from "axios"

export const login = async (data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}auth/login`, data)
        if(response.data.role==="user") throw new Error("User don't login this app")
        return response.data
    } catch (error) {
        return error.message;
    }
}