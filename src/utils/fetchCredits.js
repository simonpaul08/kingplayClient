import axios from "axios";


export const fetchCredits = async (id) => {
    return axios.post(`${import.meta.env.VITE_APP_URL}/credits`, { id });
}