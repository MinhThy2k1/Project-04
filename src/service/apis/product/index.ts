import axios from "axios"
const prefix = "product"
export default {
    findMany: async () => {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/${prefix}/`,)
    },
    create: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/product`, data)
    },
    update: async (id: any, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SV_API_URL}/product/${id}`, data)
    },
    updateback: async (id: any, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SV_API_URL}/product/back/${id}`, data)
    },
}