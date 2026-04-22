import { createContext, useContext, useState } from "react";
import {
    get_trainers_service,
    get_one_trainer_service,
    create_trainer_service,
    update_trainer_service,
    delete_trainer_service,
} from "../Services/TrainerService";

const TrainerContext = createContext();

export const TrainerProvider = ({ children }) => {
    const [trainers, setTrainers] = useState([]);

    const getTrainers = async () => {
        try {
            const { data } = await get_trainers_service();
            setTrainers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getOneTrainer = async (id) => {
        try {
            const { data } = await get_one_trainer_service(id);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const createTrainer = async (value, file) => {
        try {
            const { data } = await create_trainer_service(value, file);
            await getTrainers();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateTrainer = async (id, value, file) => {
        try {
            const { data } = await update_trainer_service(id, value, file);
            await getTrainers();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTrainer = async (id) => {
        try {
            const { data } = await delete_trainer_service(id);
            await getTrainers();
            return data;
        } catch (error) {
            console.log(error);
            const message =
                error.response?.data?.message ||
                "Something went wrong while deleting the trainer.";

            alert(message);
        }
        
    };

    return (
        <TrainerContext.Provider
            value={{
                trainers,
                getTrainers,
                getOneTrainer,
                createTrainer,
                updateTrainer,
                deleteTrainer,
            }}
        >
            {children}
        </TrainerContext.Provider>
    );
};

export const useTrainerContext = () => useContext(TrainerContext);