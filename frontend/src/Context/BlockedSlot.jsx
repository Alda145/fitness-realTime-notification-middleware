import { createContext, useContext, useEffect, useState } from "react";
import {
    get_blocked_slots_service,
    create_blocked_slot_service,
    update_blocked_slot_service,
    delete_blocked_slot_service,
    get_one_blocked_slot_service,
} from "../Services/BlockedSlot";

const BlockedSlotContext = createContext();

export const BlockedSlotProvider = ({ children }) => {
    const [blockedSlots, setBlockedSlots] = useState([]);

    const getBlockedSlots = async () => {
        try {
            const { data } = await get_blocked_slots_service();
            setBlockedSlots(data);
        } catch (error) {
            console.log(error);
        }
    };

    const createBlockedSlot = async (value) => {
        try {
            const { data } = await create_blocked_slot_service(value);
            await getBlockedSlots();
            return data;
        } catch (error) {
            console.log(error);
            const message =
                error.response?.data?.message ||
                "Something went wrong while creating blocked slot.";
            alert(message);
        }
    };

    const getOneBlockedSlot = async (id) => {
        try {
            const { data } = await get_one_blocked_slot_service(id);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateBlockedSlot = async (id, value) => {
        try {
            const { data } = await update_blocked_slot_service(id, value);
            await getBlockedSlots();
            return data;
        } catch (error) {
            console.log(error);
            const message =
                error.response?.data?.message ||
                "Something went wrong while updating blocked slot.";
            alert(message);
        }
    };

    const deleteBlockedSlot = async (id) => {
        try {
            const { data } = await delete_blocked_slot_service(id);
            await getBlockedSlots();
            return data;
        } catch (error) {
            console.log(error);
            const message =
                error.response?.data?.message ||
                "Something went wrong while deleting blocked slot.";
            alert(message);
        }
    };

    useEffect(() => {
        getBlockedSlots();
    }, []);

    return (
        <BlockedSlotContext.Provider
            value={{
                blockedSlots,
                getBlockedSlots,
                createBlockedSlot,
                getOneBlockedSlot,
                updateBlockedSlot,
                deleteBlockedSlot,
            }}
        >
            {children}
        </BlockedSlotContext.Provider>
    );
};

export const useBlockedSlotContext = () => useContext(BlockedSlotContext);