import axios from "axios";

function api() {
    // Config axios
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    /* USER */
    // Sends a request for user creation
    const userCreate = async (data) => {
        const response = await axios.post(baseUrl + "/user/create", data);
        return response;
    };

    // Sends a request for user authentication
    const userLogin = async (data) => {
        const response = await axios.post(baseUrl + "/user/login", data);
        return response;
    };

    // Sends a request to get user data
    const userProfile = async (data) => {
        const response = await axios.get(baseUrl + "/user/profile", {
            headers: {
                Authorization: "Bearer " + data,
            },
        });
        return response;
    };

    // Sends a request for update the user
    const userUpdate = async (data) => {
        const response = await axios.patch(baseUrl + "/user/update", data.info, {
            headers: {
                Authorization: "Bearer " + data.token,
            },
        });
        return response;
    };

    /* PET */
    // Sends a request to get all pets
    const petGetAll = async () => {
        const response = await axios.get(baseUrl + "/pet/all");
        return response;
    };

    // Sends a request to get pet details
    const petGetDetails = async (id) => {
        const response = await axios.get(baseUrl + "/pet/" + id);
        return response;
    };

    // Sends a request to get my pets
    const petGetMyPets = async (data) => {
        const response = await axios.get(baseUrl + "/pet/my", {
            headers: {
                Authorization: "Bearer " + data,
            },
        });

        return response;
    };

    // Sends a request to get my pets
    const petGetMyAdoptions = async (data) => {
        const response = await axios.get(baseUrl + "/pet/adoptions", {
            headers: {
                Authorization: "Bearer " + data,
            },
        });

        return response;
    };

    // Sends a request to create pet
    const petCreate = async (data) => {
        const formData = new FormData();
        Object.keys(data.info).forEach((value) => {
            formData.append(value, data.info[value]);
        });

        const response = await axios.post(baseUrl + "/pet/create", formData, {
            headers: {
                Authorization: "Bearer " + data.token,
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    };

    // Sends a request to update pet
    const petUpdate = async (data) => {
        const formData = new FormData();
        Object.keys(data.info).forEach((value) => {
            formData.append(value, data.info[value]);
        });

        const response = await axios.patch(baseUrl + "/pet/update", formData, {
            headers: {
                Authorization: "Bearer " + data.token,
                "Content-Type": "multipart/form-data",
            },
        });

        return response;
    };

    // Sends a request to remove pet
    const petDelete = async (data) => {
        const response = await axios.delete(baseUrl + "/pet/remove/" + data.id, {
            headers: { Authorization: "Bearer " + data.token },
        });

        return response;
    };

    // Sends a request to schedule a visit
    const petSchedule = async (data) => {
        const response = await axios.patch(
            baseUrl + "/pet/schedule",
            { id: data.id },
            {
                headers: { Authorization: "Bearer " + data.token },
            }
        );

        return response;
    };

    // Sends a request to finish the adoption process
    const petFinishAdoption = async (data) => {
        const response = await axios.patch(baseUrl + "/pet/finish", data.info, {
            headers: { Authorization: "Bearer " + data.token },
        });
        return response;
    };

    return {
        userCreate,
        userLogin,
        userProfile,
        userUpdate,
        petGetAll,
        petGetDetails,
        petGetMyPets,
        petGetMyAdoptions,
        petCreate,
        petUpdate,
        petDelete,
        petSchedule,
        petFinishAdoption,
    };
}

export default api;
