import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import usePet from "../hooks/usePet";

import BtnSubmit from "../components/BtnSubmit";

import style from "./Pet.module.css";

function Pet() {
    const [pet, setPet] = useState([]);
    const { id } = useParams();
    const { getPetDetails, schedule } = usePet();

    const handleOnClick = () => {
        schedule(id);
    };

    useEffect(() => {
        getPetDetails(id).then((response) => setPet(response.data));
    }, []);

    const imgUrl = process.env.REACT_APP_IMAGE_BASE_URL + "/" + pet.images;

    return (
        <>
            <h1>Detalhes</h1>
            <div className={style.pet}>
                <img src={imgUrl} alt={pet.name} />
                <h3>{pet.name}</h3>
                <ul>
                    <li>Raça: {pet.breed}</li>
                    <li>Cor: {pet.color}</li>
                    <li>Idade: {pet.age} ano(s)</li>
                </ul>
                <div>{pet.newOwner ? <strong>Indisponível</strong> : <BtnSubmit text="Agendar visita" onClick={handleOnClick} />}</div>
            </div>
        </>
    );
}

export default Pet;
