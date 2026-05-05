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
const checkAuth_user_service = async (data) => {
    const result = await axios.get(`${AUTH}/checkUser`)
    return result;
}

const register_to_courses_user_service = async (data) => {
    const result = await axios.get(`${USER}/register-course/`)
    return result;
}
export { register_user, login_user, logout_user, checkAuth_user_service, register_to_courses_user_service }