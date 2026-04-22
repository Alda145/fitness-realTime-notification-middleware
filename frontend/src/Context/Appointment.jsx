import { createContext, useContext, useState, useEffect } from "react";
import {
    get_appointment_service,
    delete_appointment_service,
    get_one_appointment_service,
    update_appointment_service

} from "../Services/AppointmentService";


const AppointmentContext = createContext();


export const AppointmentProvider = ({ children }) => {

    useEffect(() => {
        getAppointments();
    }, []);

    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const data = await get_appointment_service();
            if (data.status === 200) {
                setAppointments(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAppointment = async (id) => {
        try {
            const { data } = await delete_appointment_service(id);
            await getAppointments();
            console.log("data", data)
            return data;
        } catch (error) {
            console.log(error);
            const message =
                error.response?.data?.message ||
                "Something went wrong while deleting the appointment.";

            alert(message);
        }

    }
    const getOneAppointment = async (id) => {
        try {

            const result = await get_one_appointment_service(id)
            console.log("result : ", result);
            return result.data;

        } catch (error) {

            console.log(error)
        }
    }

    const updateAppointment = async (id, value) => {
        try {
            const result = await update_appointment_service(id, value);
            await getAppointments();
            return result.data;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <AppointmentContext.Provider
            value={{
                appointments,
                getAppointments,
                deleteAppointment,
                getOneAppointment,
                updateAppointment


            }}
        >
            {children}
        </AppointmentContext.Provider>
    );
}
export const useAppointmentContext = () => useContext(AppointmentContext);