import axios from "axios";

export default {
    findAll: async () => {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/receipt/findallreceipt`)
    },
    findMany: async () => {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/receipt`)
    },
    addToCart: async (item: any) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/receipt/add-to-cart`, item)
    },
    delete: async (itemId: any) => {
        return await axios.delete(`${import.meta.env.VITE_SV_API_URL}/receipt/${itemId}`)
    },
    update: async (data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SV_API_URL}/receipt`, data)
    },
    pay: async (receiptId: any, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SV_API_URL}/receipt/pay/${receiptId}`, data)
    },
    zaloReceipt: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/receipt/pay/zalo/`, data)
    },
    zaloCheck: async (zaloPayReceiptId: any) => {
        return await axios.post(`${import.meta.env.VITE_SV_API_URL}/receipt/pay/zalo-check/${zaloPayReceiptId}`)
    },
    updatestatus: async (receiptId: any, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SV_API_URL}/receipt/updates/${receiptId}`, data)
    },
    donestatus: async (receiptId: any, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SV_API_URL}/receipt/done/${receiptId}`, data)
    },
}