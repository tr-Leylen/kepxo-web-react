import api from "../config/api.config"

export const getCategories = async () => {
    try {
        const response = await api.get(`category`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getCategory = async (id) => {
    try {
        const res = await api.get(`category/view/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const updateCategory = async ({ data, id }) => {
    try {
        const res = await api.put(`category/${id}`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const createCategory = async (data) => {
    try {
        const res = await api.post(`category`, data)
        return res.data
    } catch (error) {
        return error
    }
}

export const deleteCategory = async (id) => {
    try {
        const res = await api.delete(`category/${id}`)
        return res.data
    } catch (error) {
        return error
    }
}