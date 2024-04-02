import axios from "axios"
const prefix = "user"
export default {
    login: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/${prefix}/login`, data)
    },
    create: async (newUser: any) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/${prefix}/register`, newUser)
    },
    decodeToken: async (token: string) => {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/${prefix}/decodeToken/${token}`)
    },
    loginWithGoogle: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/${prefix}/loginWithGoogle`, data)
    },
    updateaddress: async (userId: any, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SV_API_URL}/${prefix}/address/${userId}`, data)
    },
    // findAll: async (id: number) => {
    //     return await axios.get(`${import.meta.env.VITE_SV_API_URL}/user/finduser/`)
    // },
}