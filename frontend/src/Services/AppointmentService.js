import axios from "axios";

const URL = "http://localhost:3000/appointment/appointmentTable";
const URL_DELETE = "http://localhost:3000/appointment";

export async function get_appointment_service() {
    return await axios.get(URL, {
        withCredentials: true,
    });

}
export async function delete_appointment_service(id) {
    return await axios.delete(`${URL_DELETE}/${id}`, {
        withCredentials: true,
    });
}
export async function get_one_appointment_service(id){
    return await axios.get(`${URL_DELETE}/${id}`, {
        withCredentials: true,
    })
}

export async function update_appointment_service(id, formData) {
    return await axios.patch(`http://localhost:3000/appointment/${id}`, formData, {
        withCredentials: true,
    });
}