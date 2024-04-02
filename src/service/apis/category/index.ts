import axios from "axios";

export default {
    findMany: async () => {
        return await axios.get(`${import.meta.env.VITE_SV_API_URL}/category`,)
    }
}