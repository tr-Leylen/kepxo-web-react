import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL

export const getCategories = async () => {
    try {
        const response = await axios.get(`${baseURL}category`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getCategory = async (id) => {
    try {
        const res = await axios.get(`${baseURL}category/view/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const updateCategory = async ({ data, id }) => {
    try {
        const res = await axios.put(`${baseURL}category/${id}`, data)
        return res.data
    } catch (error) {
        return error
    }
}