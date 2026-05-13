import axios from "axios";

export const create_checkout_session_service =async (data) => {
    const result = await axios.post(
            "http://localhost:3000/payment/create-checkout-session",
            data,
            {
                withCredentials: true,
            }
        );

        return result;
    };