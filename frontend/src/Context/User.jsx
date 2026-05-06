import { createContext, useContext, useState, useEffect } from "react";
import { register_user, login_user, logout_user, checkAuth_user_service, register_to_courses_user_service } from '../Services/user'

const UserContext = createContext({});
const UserProvider = (props) => {
    const [user, setUser] = useState({})
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        checkAuthUser();
    }, [trigger]);

    const register = async (data) => {
        try {
            const result = await register_user(data);
            if (result.status === 201) {
                setUser(result.data);
                return result;
            }
        } catch (error) {
            throw error.response.data
        }
    }

    const login = async (data) => {
        try {
            const result = await login_user(data);
            if (result.status === 201) {
                setUser(result.data);
                setTrigger(true);
                return result;
            }
        } catch (error) {
            console.log("error", error);
            throw error.response.data;
        }
    }

    const logout = async () => {
        try {
            const result = await logout_user();
            if (result.data.status === 201) {
                setUser({});
                setTrigger(!trigger);
            }
        } catch (error) {
            return error
        }
    }
    const checkAuthUser = async () => {
        try {
            const result = await checkAuth_user_service()
            if (result.status === 200) {
                setUser(...result.data)
            } else {
                setUser({})
            }
            return result;
        } catch (error) {
            setUser({});
            return error;
        } finally {
            setIsAuthChecked(true);
        }
    }

    const registerToCourse = async (user_id, course_id) => {
        try {
            const result = await register_to_courses_user_service(user_id, course_id);
            if (result.status === 201) {
                return result;
            }
        } catch (error) {
            console.log("error", error);
            throw error.response.data;
        }
    }

    const values = { register, login, logout, user, isAuthChecked, checkAuthUser, registerToCourse }
    return (
        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>
    )

}
const useUserContext = () => { return (useContext(UserContext)) }
export { useUserContext, UserProvider }