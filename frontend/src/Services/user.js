import axios from 'axios';
const AUTH = 'http://localhost:3000/auth';
const USER = 'http://localhost:3000/user';

const register_user = async (data) => {
    return axios.post(`${AUTH}/register/`, data);
}
const login_user = async (data) => {
    return axios.post(`${AUTH}/login`, data)
}
const logout_user = async (data) => {
    const result = await axios.post(`${AUTH}/logout`)
    return result;
}
const checkAuth_user_service = async () => {
    const result = await axios.get(`${AUTH}/checkUser`)
    return result;
}

const register_to_courses_user_service = async (user_id, course_id) => {
    const result = await axios.post(`${USER}/register-course/`, { user_id, course_id })
    return result;
}

const get_user_enrollments_service = async (user_id) => {
    const result = await axios.get(`${USER}/all-enrollment/${user_id}`);
    console.log("result is :", result);
    return result;
};
export { register_user, login_user, logout_user, checkAuth_user_service, register_to_courses_user_service, get_user_enrollments_service }