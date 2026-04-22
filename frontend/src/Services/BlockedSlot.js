import axios from "axios";

const URL = "http://localhost:3000/blocked-slot";

export async function get_blocked_slots_service() {
    return await axios.get(URL);
}

export async function create_blocked_slot_service(value) {
    return await axios.post(URL, value);
}

export async function get_one_blocked_slot_service(id) {
    return await axios.get(`${URL}/${id}`);
}

export async function update_blocked_slot_service(id, value) {
    return await axios.patch(`${URL}/${id}`, value);
}

export async function delete_blocked_slot_service(id) {
    return await axios.delete(`${URL}/${id}`);
}