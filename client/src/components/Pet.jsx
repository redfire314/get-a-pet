import { Link } from "react-router-dom";

import style from "./Pet.module.css";

function Pet(props) {
    const imgUrl = process.env.REACT_APP_IMAGE_BASE_URL + "/" + props.image;

    return (
        <div className={style.pet}>
            <img src={imgUrl} alt={props.name} />
            <h3>{props.name}</h3>
            <ul>
                <li>Raça: {props.breed}</li>
                <li>Cor: {props.color}</li>
                <li>Idade: {props.age} ano(s)</li>
            </ul>
            <div className={style.pet__actions}>{props.newOwner ? <strong>Adotado</strong> : <Link to={`./pet/${props.id}`}>Detalhes</Link>}</div>
        </div>
    );
}

export default Pet;
