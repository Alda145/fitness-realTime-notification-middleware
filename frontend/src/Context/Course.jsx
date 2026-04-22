import { createContext, useContext, useState } from "react";
import {
    get_courses_service,
    get_one_course_service,
    create_course_service,
    update_course_service,
    delete_course_service,
} from "../Services/CourseService";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        try {
            const { data } = await get_courses_service();
            setCourses(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getOneCourse = async (id) => {
        try {
            const { data } = await get_one_course_service(id);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const createCourse = async (value, file) => {
        try {
            const { data } = await create_course_service(value, file);
            await getCourses();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateCourse = async (id, value, file) => {
        try {
            const { data } = await update_course_service(id, value, file);
            await getCourses();
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCourse = async (id) => {
        try {
            const { data } = await delete_course_service(id);
            await getCourses();
            return data;
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    return (
        <CourseContext.Provider
            value={{
                courses,
                getCourses,
                getOneCourse,
                createCourse,
                updateCourse,
                deleteCourse,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};

export const useCourseContext = () => useContext(CourseContext);