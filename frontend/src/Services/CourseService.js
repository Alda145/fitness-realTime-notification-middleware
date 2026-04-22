import axios from "axios";

const URL = "http://localhost:3000/courses";

export async function get_courses_service() {
    return await axios.get(URL);
}

export async function get_one_course_service(id) {
    return await axios.get(`${URL}/${id}`);
}

export async function create_course_service(data, icon) {
    const formdata = new FormData();

    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append("day", data.day);
    formdata.append("time", data.time);
    formdata.append("trainer_id", data.trainer_id);

    if (icon) {
        formdata.append("icon", icon);
    }

    return await axios.post(URL, formdata, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export async function update_course_service(id, data, icon) {
    const formdata = new FormData();

    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append("day", data.day);
    formdata.append("time", data.time);
    formdata.append("trainer_id", data.trainer_id);

    if (icon) {
        formdata.append("icon", icon);
    }

    return await axios.patch(`${URL}/${id}`, formdata, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export async function delete_course_service(id) {
    return await axios.delete(`${URL}/${id}`);
}