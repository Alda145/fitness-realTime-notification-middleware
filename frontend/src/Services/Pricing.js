import axios from 'axios';

const API_URL = "http://localhost:3000/pricing";

export const get_pricing_service = async () => {

    return await axios.get(API_URL);

}