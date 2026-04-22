import axios from "axios";

const URL = "http://localhost:3000/trainers";

export async function get_trainers_service() {
    return await axios.get(URL);
}

export async function get_one_trainer_service(id) {
    return await axios.get(`${URL}/${id}`);
}

export async function create_trainer_service(data, image) {
    const formdata = new FormData();
    console.log("formdata e sapokrijuar", formdata)
    formdata.append("name", data.name);
    formdata.append("role", data.role);
    formdata.append("facebook", data.facebook);
    formdata.append("twitter", data.twitter);
    formdata.append("instagram", data.instagram);
    formdata.append("linkedin", data.linkedin);

    if (image) {
        formdata.append("image", image);
    }
    console.log("formdata e sapo bere append :", formdata)
    // formdata.forEach((value, key) => {
    //     console.log(key + ":", value);
    // });
    console.log("formdata.entries", formdata.entries())
    for (let [key, value] of formdata.entries()) {
        console.log(key, value);
    }
    return await axios.post(URL, formdata, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export async function update_trainer_service(id, data, image) {
    const formdata = new FormData();

    formdata.append("name", data.name);
    formdata.append("role", data.role);
    formdata.append("facebook", data.facebook);
    formdata.append("twitter", data.twitter);
    formdata.append("instagram", data.instagram);
    formdata.append("linkedin", data.linkedin);

    if (image) {
        formdata.append("image", image);
    }

    return await axios.patch(`${URL}/${id}`, formdata, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export async function delete_trainer_service(id) {
    return await axios.delete(`${URL}/${id}`);
}