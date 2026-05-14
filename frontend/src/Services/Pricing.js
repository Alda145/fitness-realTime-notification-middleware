import axios from "axios";

const API = "http://localhost:3000/pricing";

export const get_pricing_service = async () => {
    return await axios.get(API, { withCredentials: true });
};

export const create_pricing_service = async (data) => {
    return await axios.post(API, data, { withCredentials: true });
};

export const update_pricing_service = async (id, data) => {
    return await axios.put(`${API}/${id}`, data, { withCredentials: true });
};

export const delete_pricing_service = async (id) => {
    return await axios.delete(`${API}/${id}`, { withCredentials: true });
};