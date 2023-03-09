import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import usePet from "../hooks/usePet";

import PetDashboard from "../components/PetDashboard";

import style from "./Dashboard.module.css";

export default function Dashboard() {
    const [myPets, setMyPets] = useState([]);
    const [myAdoptions, setMyAdoptions] = useState([]);
    const { getMyPets, getMyAdoptions } = usePet();

    useEffect(() => {
        getMyPets().then((response) => setMyPets(response.data.myPets));
        getMyAdoptions().then((response) => setMyAdoptions(response.data.myAdoptions));
    }, []);

    return (
        <div className={style.wrapper}>
            <h1>Dashboard</h1>
            <div className={style.action}>
                <Link to="/adicionar-pet">Adicionar Pet</Link>
            </div>
            <h2>Meus pets</h2>
            {myPets.map((pet, index) => (
                <PetDashboard
                    key={index}
                    id={pet._id}
                    image={pet.images[0]}
                    name={pet.name}
                    breed={pet.breed}
                    color={pet.color}
                    age={pet.age}
                    pendingOwners={pet.pendingOwners}
                    newOwner={pet.newOwner}
                />
            ))}
            <h2>Minhas adoções</h2>
            {myAdoptions.map((pet, index) => (
                <PetDashboard
                    key={index}
                    id={pet._id}
                    image={pet.images[0]}
                    name={pet.name}
                    breed={pet.breed}
                    color={pet.color}
                    age={pet.age}
                    pendingOwners={pet.pendingOwners}
                    newOwner={pet.newOwner}
                />
            ))}
        </div>
    );
}
