import { createContext, useContext, useState } from "react";
import {
    get_pricing_service,
    create_pricing_service,
    update_pricing_service,
    delete_pricing_service,
} from "../Services/Pricing";

const PricingContext = createContext();

export const PricingProvider = ({ children }) => {
    const [pricingList, setPricingList] = useState([]);

    const getPricing = async () => {
        try {
            const { data } = await get_pricing_service();
            setPricingList(data);
        } catch (error) {
            console.log(error);
        }
    };

    // const getOnePricing = async (id) => {
    //     try {
    //         const { data } = await get_one_pricing_service(id);
    //         return data;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const createPricing = async (value) => {
        try {
            const { data } = await create_pricing_service(value);
            await getPricing();
            return data;
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to create pricing.");
        }
    };

    const updatePricing = async (id, value) => {
        try {
            const { data } = await update_pricing_service(id, value);
            await getPricing();
            return data;
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to update pricing.");
        }
    };

    const deletePricing = async (id) => {
        try {
            const { data } = await delete_pricing_service(id);
            await getPricing();
            return data;
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to delete pricing.");
        }
    };

    return (
        <PricingContext.Provider
            value={{
                pricingList,
                getPricing,
               // getOnePricing,
                createPricing,
                updatePricing,
                deletePricing,
            }}
        >
            {children}
        </PricingContext.Provider>
    );
};

export const usePricingContext = () => useContext(PricingContext);