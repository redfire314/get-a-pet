import { useState, useEffect } from "react";
import api from "../services/api";

function usePet() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const { petGetAll } = api();
        petGetAll().then((response) => setPets(response.data.pets));
    }, []);

    // Get all pets from database
    const getAllPets = () => {
        return pets;
    };

    // Get pet details from database
    const getPetDetails = async (id) => {
        const { petGetDetails } = api();
        const response = await petGetDetails(id);
        return response;
    };

    // Get my pets from database
    const getMyPets = async () => {
        const { petGetMyPets } = api();
        const token = localStorage.getItem("token");
        const response = await petGetMyPets(token);
        return response;
    };

    // Get my adoptions from database
    const getMyAdoptions = async () => {
        const { petGetMyAdoptions } = api();
        const token = localStorage.getItem("token");
        const response = await petGetMyAdoptions(token);
        return response;
    };

    // Create pet on database
    const createPet = async (image, name, breed, color, age) => {
        const { petCreate } = api();
        const token = localStorage.getItem("token");
        const response = await petCreate({
            info: { image, name, breed, color, age },
            token,
        });

        // TO DO: Flash messages
        console.log(response);
    };

    // Update pet on database
    const updatePet = async (id, image, name, breed, color, age) => {
        const { petUpdate } = api();
        const token = localStorage.getItem("token");
        const response = await petUpdate({
            info: { id, image, name, breed, color, age },
            token,
        });

        // TO DO: Flash messages
        console.log(response);
    };

    // Remove pet on database
    const removePet = async (id) => {
        const { petDelete } = api();
        const token = localStorage.getItem("token");
        const response = await petDelete({ id, token });

        // TO DO: Flash messages
        console.log(response);
    };

    // Schedule a visit
    const schedule = async (id) => {
        const { petSchedule } = api();
        const token = localStorage.getItem("token");
        const response = await petSchedule({ id, token });

        // TO DO: Flash messages
        console.log(response);
    };

    // Finish adoption
    const finishAdoption = async (petId, newOwnerId) => {
        const { petFinishAdoption } = api();
        const token = localStorage.getItem("token");
        const data = {
            info: { petId, newOwnerId },
            token,
        };

        const response = await petFinishAdoption(data);
        console.log(response);
    };

    return {
        getAllPets,
        getPetDetails,
        getMyPets,
        getMyAdoptions,
        createPet,
        updatePet,
        removePet,
        schedule,
        finishAdoption,
    };
}

export default usePet;
